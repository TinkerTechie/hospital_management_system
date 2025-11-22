import { NextResponse } from 'next/server';

const firstAidData = [
    {
        id: 'cpr',
        title: 'CPR (Cardiopulmonary Resuscitation)',
        description: 'Life-saving technique for cardiac arrest.',
        steps: [
            "Check for responsiveness and breathing.",
            "Call 1066 or emergency services immediately.",
            "Place hands on the center of the chest.",
            "Push hard and fast (100-120 compressions per minute).",
            "Allow chest to recoil completely between compressions.",
            "Continue until help arrives or the person starts breathing."
        ],
        dos: ["Push hard and fast", "Minimize interruptions"],
        donts: ["Do not stop unless exhausted or help arrives"],
        source: "Red Cross Guidelines",
        keywords: ["heart", "attack", "cardiac", "arrest", "chest", "pain", "unconscious", "breathing", "cpr", "pump", "revive", "collapsed", "not breathing", "no pulse", "unresponsive"]
    },
    {
        id: 'burns',
        title: 'Burns (Minor to Major)',
        description: 'Immediate care for thermal or chemical burns.',
        steps: [
            "Cool the burn with cool (not cold) running water for 10-20 minutes.",
            "Remove tight items (rings, watches) before swelling starts.",
            "Cover with a sterile, non-stick bandage or clean cloth.",
            "Do not pop blisters.",
            "Seek medical help for severe burns or chemical burns."
        ],
        dos: ["Use cool running water", "Keep the person warm"],
        donts: ["Do not use ice", "Do not apply butter or ointments"],
        source: "St. John Ambulance",
        keywords: ["fire", "hot", "scald", "chemical", "skin", "blister", "stove", "boiling", "water", "acid", "burned", "burning", "flame", "steam", "oil", "touched", "spilled"]
    },
    {
        id: 'choking',
        title: 'Choking (Adult)',
        description: 'Action for obstructed airway.',
        steps: [
            "Ask 'Are you choking?'. If they can speak/cough, encourage coughing.",
            "If silent/unable to breathe: Give 5 back blows between shoulder blades.",
            "If that fails: Give 5 abdominal thrusts (Heimlich maneuver).",
            "Stand behind, wrap arms around waist, make a fist above navel.",
            "Pull inward and upward sharply.",
            "Repeat 5 back blows and 5 thrusts until object clears."
        ],
        dos: ["Act quickly", "Call for help if unconscious"],
        donts: ["Do not slap back if they are coughing effectively"],
        source: "Mayo Clinic",
        keywords: ["swallow", "swallowed", "food", "stuck", "throat", "breathe", "breathing", "cough", "coughing", "heimlich", "airway", "blocked", "coin", "toy", "cannot breathe", "can't breathe", "gasping", "choking"]
    },
    {
        id: 'bleeding',
        title: 'Severe Bleeding',
        description: 'Control heavy bleeding to prevent shock.',
        steps: [
            "Apply direct pressure on the wound with a clean cloth.",
            "Keep pressure until bleeding stops.",
            "If blood soaks through, add more layers (do not remove first layer).",
            "Keep the injured limb elevated if possible.",
            "Call 1066 if bleeding is severe or doesn't stop."
        ],
        dos: ["Apply constant pressure", "Wash hands before/after if possible"],
        donts: ["Do not remove impaled objects", "Do not remove soaked bandages"],
        source: "Red Cross",
        keywords: ["cut", "wound", "blood", "bleeding", "hemorrhage", "injury", "knife", "glass", "accident", "deep", "gash", "laceration", "profuse", "heavy bleeding"]
    },
    {
        id: 'snakebite',
        title: 'Snake Bite',
        description: 'Emergency care for venomous bites.',
        steps: [
            "Keep the person calm and still to slow venom spread.",
            "Remove jewelry or tight clothing near the bite.",
            "Position the bite below heart level.",
            "Clean the wound with soap and water.",
            "Cover with a clean, dry dressing.",
            "Transport to hospital immediately."
        ],
        dos: ["Keep patient still", "Note the snake's appearance"],
        donts: ["Do not cut the wound", "Do not suck out venom", "Do not apply ice or tourniquet"],
        source: "WHO Guidelines",
        keywords: ["snake", "venom", "poison", "poisonous", "bite", "bitten", "cobra", "viper", "reptile", "sting"]
    },
    {
        id: 'fracture',
        title: 'Fractures (Broken Bone)',
        description: 'Care for suspected broken bones.',
        steps: [
            "Stop any bleeding. Apply pressure to the wound with a sterile bandage.",
            "Immobilize the injured area. Do not try to realign the bone.",
            "Apply ice packs to limit swelling and help relieve pain.",
            "Treat for shock. If the person feels faint, lay them down.",
            "Get professional help immediately."
        ],
        dos: ["Keep limb still", "Apply ice"],
        donts: ["Do not massage", "Do not straighten bone"],
        source: "Mayo Clinic",
        keywords: ["break", "broken", "bone", "leg", "arm", "fall", "fell", "crack", "cracked", "pain", "swelling", "twisted", "fracture", "ankle", "wrist", "finger"]
    },
    {
        id: 'seizure',
        title: 'Seizure',
        description: 'Protecting a person during a seizure.',
        steps: [
            "Ease the person to the floor.",
            "Turn them gently onto one side to help them breathe.",
            "Clear the area of hard or sharp objects.",
            "Put something soft and flat, like a folded jacket, under their head.",
            "Remove eyeglasses. Loosen ties or anything around the neck."
        ],
        dos: ["Time the seizure", "Stay with them"],
        donts: ["Do not hold them down", "Do not put anything in mouth"],
        source: "CDC",
        keywords: ["fit", "fits", "shake", "shaking", "convulsion", "epilepsy", "faint", "fainting", "jerking", "unconscious", "seizure", "spasm"]
    },
    {
        id: 'heatstroke',
        title: 'Heat Stroke',
        description: 'Emergency treatment for severe heat illness.',
        steps: [
            "Move the person to a cool, shaded area immediately.",
            "Remove excess clothing.",
            "Cool the person rapidly using cool water, wet towels, or ice packs.",
            "Fan the person while misting with cool water.",
            "If conscious, give small sips of cool water.",
            "Call 1066 immediately - heat stroke is life-threatening."
        ],
        dos: ["Cool rapidly", "Monitor temperature"],
        donts: ["Do not give aspirin or acetaminophen", "Do not give fluids if unconscious"],
        source: "CDC",
        keywords: ["heat", "hot", "sun", "temperature", "dizzy", "nausea", "headache", "confusion", "red skin", "sweating", "dehydration", "summer"]
    },
    {
        id: 'shock',
        title: 'Shock',
        description: 'Recognizing and treating medical shock.',
        steps: [
            "Lay the person down and elevate their legs about 12 inches.",
            "Do not move if head, neck, or back injury is suspected.",
            "Keep the person warm with a blanket.",
            "Do not give anything to eat or drink.",
            "Turn head to side if vomiting.",
            "Call 1066 immediately."
        ],
        dos: ["Keep warm", "Elevate legs", "Monitor breathing"],
        donts: ["Do not give food or water", "Do not move if spinal injury"],
        source: "Red Cross",
        keywords: ["pale", "cold", "clammy", "weak", "rapid pulse", "shallow breathing", "confused", "anxious", "shock"]
    }
];

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json(firstAidData);
    }

    const lowerQuery = query.toLowerCase().trim();

    // Split query into words, keeping words of 2+ characters
    const queryWords = lowerQuery.split(/\s+/).filter(word => word.length >= 2);

    const filtered = firstAidData.filter(item => {
        // 1. Check if full query matches title or description
        if (item.title.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery)) {
            return true;
        }

        // 2. Check if full query matches any keyword exactly
        if (item.keywords && item.keywords.some(keyword => keyword === lowerQuery)) {
            return true;
        }

        // 3. Check if any query word matches any keyword (partial match)
        if (item.keywords && queryWords.length > 0) {
            const matchCount = queryWords.filter(word =>
                item.keywords.some(keyword =>
                    keyword.includes(word) ||
                    word.includes(keyword) ||
                    keyword.toLowerCase() === word.toLowerCase()
                )
            ).length;

            // Return true if at least one word matches
            if (matchCount > 0) {
                return true;
            }
        }

        // 4. Check steps for matches (for very specific queries)
        if (item.steps) {
            const stepsText = item.steps.join(' ').toLowerCase();
            if (queryWords.some(word => stepsText.includes(word))) {
                return true;
            }
        }

        return false;
    });

    // Sort results by relevance (exact matches first)
    filtered.sort((a, b) => {
        const aExact = a.title.toLowerCase().includes(lowerQuery) ||
            (a.keywords && a.keywords.includes(lowerQuery));
        const bExact = b.title.toLowerCase().includes(lowerQuery) ||
            (b.keywords && b.keywords.includes(lowerQuery));

        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        return 0;
    });

    return NextResponse.json(filtered);
}
