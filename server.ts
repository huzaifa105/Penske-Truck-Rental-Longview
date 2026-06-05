import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { FLEET_VEHICLES } from "./src/data/fleet.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for live persistence during container lifetime
const reservationsList: any[] = [
  {
    id: "RSV-7402",
    customerName: "Jane Miller",
    customerEmail: "jane.miller@techhaul.com",
    customerPhone: "+1 (903) 555-0144",
    pickupLocation: "Bufkin Longview Depot",
    returnLocation: "Bufkin Longview Depot",
    pickupDate: "2026-06-10",
    returnDate: "2026-06-15",
    vehicleId: "box-intl-16ft",
    status: "Confirmed",
    totalCost: 746.50,
    days: 5,
    hasCdwInsurance: true,
    notes: "Requires hand truck dolly accessory",
    createdAt: new Date().toISOString()
  },
  {
    id: "RSV-9155",
    customerName: "David Garza",
    customerEmail: "dgarza@garzaconstruction.net",
    customerPhone: "+1 (903) 236-4192",
    pickupLocation: "Bufkin Longview Depot",
    returnLocation: "Bufkin Longview Depot",
    pickupDate: "2026-06-12",
    returnDate: "2026-06-19",
    vehicleId: "flatbed-ram-5500",
    status: "Confirmed",
    totalCost: 1086.67,
    days: 7,
    hasCdwInsurance: false,
    notes: "Hauling steel girders for downtown commercial site",
    createdAt: new Date().toISOString()
  }
];

const quotesList: any[] = [];
const contactMessages: any[] = [];

// API: Get vehicle catalog
app.get("/api/fleet", (req, res) => {
  res.json(FLEET_VEHICLES);
});

// API: Get current reservations
app.get("/api/reservations", (req, res) => {
  res.json(reservationsList);
});

// API: Submit a rental booking
app.post("/api/reservations", (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      pickupLocation,
      returnLocation,
      pickupDate,
      returnDate,
      vehicleId,
      hasCdwInsurance,
      notes
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !pickupDate || !returnDate || !vehicleId) {
      return res.status(400).json({ error: "Missing required reservation fields" });
    }

    const vehicle = FLEET_VEHICLES.find(v => v.id === vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle category not found" });
    }

    // Calculation of days
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (days <= 0) days = 1;

    // Weekly pricing calculations: weeks at weekly rate, extra days at daily rate
    const weeks = Math.floor(days / 7);
    const extraDays = days % 7;
    let baseRentalCost = (weeks * vehicle.rateWeekly) + (extraDays * vehicle.rateDaily);

    // Optional CDW Insurance
    const cdwCost = hasCdwInsurance ? days * 19.99 : 0;
    const envFee = 15.00;
    const taxRate = 0.0825; // 8.25% Texas State Sales Tax
    
    const subtotal = baseRentalCost + cdwCost + envFee;
    const taxCost = Math.round(subtotal * taxRate * 100) / 100;
    const totalCost = Math.round((subtotal + taxCost) * 100) / 100;

    const newReservation = {
      id: "RSV-" + Math.floor(1000 + Math.random() * 9000),
      customerName,
      customerEmail,
      customerPhone,
      pickupLocation: pickupLocation || "Bufkin Longview Depot",
      returnLocation: returnLocation || "Bufkin Longview Depot",
      pickupDate,
      returnDate,
      vehicleId,
      status: "Confirmed",
      totalCost,
      days,
      hasCdwInsurance: !!hasCdwInsurance,
      notes: notes || "",
      createdAt: new Date().toISOString()
    };

    reservationsList.push(newReservation);
    res.status(201).json(newReservation);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// API: Process Quote Requests
app.post("/api/quotes", (req, res) => {
  const {
    name,
    email,
    phone,
    companyName,
    pickupZip,
    returnZip,
    vehicleCategory,
    estimatedWeight,
    message
  } = req.body;

  if (!name || !email || !phone || !pickupZip || !vehicleCategory) {
    return res.status(400).json({ error: "Please fill out all required quote fields." });
  }

  const quoteId = "QTE-" + Math.floor(10000 + Math.random() * 90000);
  const newQuote = {
    id: quoteId,
    name,
    email,
    phone,
    companyName: companyName || "Personal Account",
    pickupZip,
    returnZip: returnZip || pickupZip,
    vehicleCategory,
    estimatedWeight: estimatedWeight || "Under 2,000 lbs",
    message: message || "",
    status: "Received",
    createdAt: new Date().toISOString()
  };

  quotesList.push(newQuote);
  res.status(201).json({
    success: true,
    message: "Your custom commercial quote request has been logged successfully.",
    quote: newQuote
  });
});

// API: Receive contact form contact submissions
app.post("/api/contact", (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  const newMessage = {
    id: "MSG-" + Math.floor(1000 + Math.random() * 9000),
    name,
    email,
    phone: phone || "",
    subject: subject || "General Inquiry",
    message,
    createdAt: new Date().toISOString()
  };

  contactMessages.push(newMessage);
  res.status(201).json({
    success: true,
    message: "Thank you for contacting Bufkin Truck Services. Our Longview dispatcher will call you shortly."
  });
});

// API: Smart Gemini Fleet Finder and Advisor
app.post("/api/truck-finder", async (req, res) => {
  const { description, weight, otherDetails } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Cargo description is required to analyze." });
  }

  // Local fallback selector in case Gemini API key is placeholder or missing
  const runFallbackRecommendation = () => {
    let recommendedVehicleId = "box-intl-16ft"; // Default robust option
    let reasoning = "Based on commercial logistics standards, our International 16ft Box Truck is ideal for handling typical business distributions and equipment transfers securely.";
    let tips = [
      "Distribute the heaviest pallets evenly down the crew compartment's center axis.",
      "Always secure upright boxes with ratchet tie-down straps along the loaded E-Tracks."
    ];

    const descLower = description.toLowerCase();
    const weightVal = parseInt(weight) || 0;

    if (descLower.includes("sofa") || descLower.includes("furniture") || descLower.includes("apartment") || descLower.includes("moving house") || descLower.includes("household")) {
      recommendedVehicleId = "moving-f650-26ft";
      reasoning = "Household moving requires massive enclosed volume. Our 26ft Super Mover provides 1,680 cu ft of space with standard dual-row cargo locks and a heavy-duty wide aluminum slide-out ramp, easily fitting 5 to 7 rooms of house furniture under cover.";
      tips = [
        "Place mattresses upright along the walls and strap them tight as cushioning panels.",
        "Save the cabinet and drawer spaces to slide in lighter fragile baggage."
      ];
    } else if (descLower.includes("gravel") || descLower.includes("pipe") || descLower.includes("dirt") || descLower.includes("construction") || descLower.includes("timber") || descLower.includes("steel") || descLower.includes("pallet")) {
      recommendedVehicleId = "flatbed-ram-5500";
      reasoning = "Unbound building supplies, scaffolding steel, and farm machinery require forklift access from all angles. The RAM 5500 flatbed deck permits multi-directional forklift loading and offers heavy-load spring suspension for up to 11,500 lbs.";
      tips = [
        "Verify your cargo height permits passing local highway underpass overhanging limits easily.",
        "Double-check your heavy binder chains for rust wear before leaving Bufkin lot."
      ];
    } else if (descLower.includes("plant") || descLower.includes("soil") || descLower.includes("nursery") || descLower.includes("sod") || descLower.includes("garden")) {
      recommendedVehicleId = "stake-silverado-12ft";
      reasoning = "Flora, green landscaping, sod rolls and building timbers load best on a physical stake bed. The Silverado Stake Truck lets you slide off specific oak racks to forklift load items, keeping soil or mulch secured away from the premium chassis interior.";
      tips = [
        "Cover delicate nursery stocks with cargo nets to prevent foliage damage from highway headwinds.",
        "Keep the tail section tightly padlocked while navigating local urban freight routes."
      ];
    } else if (descLower.includes("courier") || descLower.includes("box") || descLower.includes("small") || descLower.includes("mail") || descLower.includes("delivery") || descLower.includes("food") || weightVal < 1500) {
      if (descLower.includes("pickup") || descLower.includes("site") || descLower.includes("tow")) {
        recommendedVehicleId = "pickup-ford-f250";
        reasoning = "For light site hauling, visits, or small crew transfers, the Ford F-250 Super Duty provides 4WD and a heavy tow setup with luxurious seating comfort for a team of 5.";
        tips = [
          "Secure items inside the steel-liner bed with heavy weatherproof elastic cargo netting.",
          "Enable tow/haul transmission mode if towing light trailers across TX-31 inclines."
        ];
      } else {
        recommendedVehicleId = "van-transit-250";
        reasoning = "Protected courier items, electronic units, catering boxes, and parcel collections fit perfectly in the Transit High Roof. With 81 inches of standing cabin depth and easy swing-out doors, it offers unmatched delivery speed and safety.";
        tips = [
          "Group matching delivery zones in physical bundles and stack frontmost items last.",
          "Lock the side sliding entry doors at stoplights to secure commercial electronics."
        ];
      }
    } else if (weightVal > 11000 || descLower.includes("dock") || descLower.includes("pallet") || descLower.includes("freight")) {
      recommendedVehicleId = "comm-freightliner-26ft";
      reasoning = "Heavy-duty retail distribution and industrial shipping require commercial air brakes and standard dock-high gates. The Freightliner M2 106 handles 16,000 lbs of cargo and features a massive 3,500 lbs hydraulic tuck-away Maxon gate.";
      tips = [
        "An active Commercial Driver's License (Class B CDL) is required. Secure physical badges at pickup.",
        "Secure high-value electronics alongside robust interior cargo locks on both sides."
      ];
    }

    return { recommendedVehicleId, reasoning, tips };
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.includes("MY_GEMINI_API_KEY")) {
    console.warn("Using smart rule-based local fleet finder (GEMINI_API_KEY placeholder detected).");
    return res.json({
      ...runFallbackRecommendation(),
      isSimulated: true
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const categoriesString = FLEET_VEHICLES.map(v => `- Category name: ${v.category} (id: "${v.id}"). Capacity: ${v.payloadCapacity}. Specs: Cargo volume ${v.cargoCapacity}, bed size ${v.dimensions}`).join("\n");

    const systemPrompt = `You are the chief fleet logistician advisor for Bufkin Truck Services, located at 3132 TX-31, Longview, TX. 
Analyze the customer's cargo specifications carefully (description, estimated weights, other details) and matches them to ONE of our professional commercial categories.
Our current collection:
${categoriesString}

Return a highly cohesive recommendation, including specific packing and tie-down tips for their exact goods.
Response MUST be formatted strictly as clear JSON matching this schema exactly:
{
  "recommendedVehicleId": "v-id-from-above-list",
  "reasoning": "Detailed technical analysis of why this specific vehicle is selected. Reference the payloads constraints, enclosed vs open hauling, loading gates, and ease of loading in Longview, TX area.",
  "tips": ["Clear pro tip #1 focused on cargo safety, center of gravity, or strap tying", "Pro tip #2 focusing on routing or vehicle operations"]
}
Output raw valid JSON without markdown decorators (no \`\`\`json).`;

    const contents = `Customer cargo description: "${description}"
Approximate weight: ${weight || "Not specified"}
Additional notes: ${otherDetails || "None"}`;

    const geminiRes = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    });

    const text = geminiRes.text;
    if (text) {
      const parsed = JSON.parse(text);
      res.json(parsed);
    } else {
      throw new Error("Empty representation returned from AI");
    }
  } catch (err: any) {
    console.error("Gemini Advisor Error, falling back:", err);
    res.json({
      ...runFallbackRecommendation(),
      isSimulated: true,
      errorInfo: err.message
    });
  }
});

// Configure Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bufkin Truck Services full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
