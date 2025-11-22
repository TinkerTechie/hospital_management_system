import { NextResponse } from 'next/server';

export async function GET() {
    const conditions = [
        {
            id: "coronary-artery-disease",
            name: "Coronary Artery Disease",
            description: "A condition where the major blood vessels that supply your heart become damaged or diseased.",
            symptoms: ["Chest pain (angina)", "Shortness of breath", "Pain in the neck, jaw, or back"],
            riskFactors: ["High blood pressure", "High cholesterol", "Smoking", "Diabetes"],
            treatment: "Lifestyle changes, medications, angioplasty, or bypass surgery.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: "heart-attack",
            name: "Heart Attack (Myocardial Infarction)",
            description: "A blockage of blood flow to the heart muscle.",
            symptoms: ["Pressure, tightness, pain, or a squeezing or aching sensation in your chest or arms", "Nausea, indigestion, heartburn or abdominal pain", "Shortness of breath"],
            riskFactors: ["Age", "Tobacco", "High blood pressure", "Obesity"],
            treatment: "Immediate medical attention, medications, surgery.",
            image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: "arrhythmia",
            name: "Arrhythmia",
            description: "Improper beating of the heart, whether too fast or too slow.",
            symptoms: ["Fluttering in chest", "Racing heartbeat (tachycardia)", "Slow heartbeat (bradycardia)", "Chest pain"],
            riskFactors: ["Coronary artery disease", "High blood pressure", "Congenital heart defects"],
            treatment: "Vagal maneuvers, medications, cardioversion, catheter ablation, pacemaker.",
            image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2072&auto=format&fit=crop"
        },
        {
            id: "heart-failure",
            name: "Heart Failure",
            description: "A chronic condition in which the heart doesn't pump blood as well as it should.",
            symptoms: ["Shortness of breath", "Fatigue and weakness", "Swelling in legs, ankles and feet"],
            riskFactors: ["Coronary artery disease", "Heart attack", "High blood pressure"],
            treatment: "Medications, surgery, medical devices (ICD, CRT), heart transplant.",
            image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    return NextResponse.json(conditions);
}
