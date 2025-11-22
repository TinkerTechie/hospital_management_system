import { NextResponse } from 'next/server';

export async function GET() {
    const services = [
        {
            id: "interventional-cardiology",
            title: "Interventional Cardiology",
            shortDesc: "Minimally invasive procedures like Angioplasty and Stenting.",
            fullDesc: "Interventional cardiology deals with the catheter-based treatment of structural heart diseases. It involves using a small tube (catheter) to repair damaged or weakened vessels, narrowed arteries, or other affected parts of the heart structure.",
            procedureSteps: [
                "Local anesthesia is applied.",
                "A catheter is inserted into a blood vessel.",
                "Contrast dye is injected to visualize blockages.",
                "Balloon angioplasty or stent placement is performed."
            ],
            eligibility: "Patients with coronary artery disease, heart valve disease, or peripheral vascular disease.",
            image: "https://images.unsplash.com/photo-1579684385180-1ea67fbc3faa?q=80&w=2072&auto=format&fit=crop"
        },
        {
            id: "electrophysiology",
            title: "Electrophysiology",
            shortDesc: "Diagnosis and treatment of heart rhythm disorders.",
            fullDesc: "Cardiac electrophysiology is the science of elucidating, diagnosing, and treating the electrical activities of the heart. It is used to assess complex arrhythmias, elucidate symptoms, evaluate abnormal electrocardiograms, assess risk of developing arrhythmias in the future, and design treatment.",
            procedureSteps: [
                "Catheters are inserted through veins in the groin.",
                "Electrical signals are mapped.",
                "Ablation is performed to destroy tissue causing abnormal rhythms.",
                "Pacemaker or ICD implantation if necessary."
            ],
            eligibility: "Patients with atrial fibrillation, tachycardia, bradycardia, or other arrhythmias.",
            image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2072&auto=format&fit=crop"
        },
        {
            id: "cardiac-surgery",
            title: "Cardiac Surgery",
            shortDesc: "Advanced surgical solutions including Bypass and Valve Replacement.",
            fullDesc: "Cardiac surgery, or cardiovascular surgery, is surgery on the heart or great vessels performed by cardiac surgeons. It is often used to treat complications of ischemic heart disease (for example, with coronary artery bypass grafting); to correct congenital heart disease; or to treat valvular heart disease from various causes.",
            procedureSteps: [
                "General anesthesia is administered.",
                "The chest is opened (sternotomy) or minimally invasive incision.",
                "Heart-lung machine may be used.",
                "Surgery is performed (bypass, valve repair/replacement).",
                "Chest is closed and recovery begins."
            ],
            eligibility: "Patients with severe coronary artery disease, valve defects, or aortic aneurysms.",
            image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2047&auto=format&fit=crop"
        },
        {
            id: "non-invasive-cardiology",
            title: "Non-Invasive Cardiology",
            shortDesc: "Comprehensive testing including Echo, Stress Tests, and Holter.",
            fullDesc: "Non-invasive cardiology focuses on the detection and treatment of heart disease using external tests rather than instruments inserted into the body to evaluate and diagnose cardiac disorders.",
            procedureSteps: [
                "Patient preparation (e.g., changing into a gown).",
                "Electrodes or ultrasound probe applied.",
                "Monitoring during rest or exercise (stress test).",
                "Data analysis by a cardiologist."
            ],
            eligibility: "Anyone experiencing chest pain, palpitations, or shortness of breath.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    return NextResponse.json(services);
}
