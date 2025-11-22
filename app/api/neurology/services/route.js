import { NextResponse } from 'next/server';

export async function GET() {
    const services = [
        {
            id: "stroke-management",
            title: "Stroke Management",
            shortDesc: "Rapid assessment and advanced treatment for acute stroke.",
            fullDesc: "Our comprehensive stroke center provides 24/7 rapid assessment and treatment for acute stroke patients. We utilize the latest imaging technology and clot-busting therapies to minimize brain damage and improve outcomes.",
            procedureSteps: [
                "Rapid triage and neurological assessment.",
                "CT or MRI imaging to confirm stroke type.",
                "Administration of tPA (clot-busting drug) if eligible.",
                "Endovascular thrombectomy for large vessel occlusions.",
                "Admission to dedicated Stroke Unit for monitoring."
            ],
            eligibility: "Patients exhibiting sudden signs of stroke (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency).",
            image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "epilepsy-treatment",
            title: "Epilepsy Treatment",
            shortDesc: "Comprehensive care for seizure disorders.",
            fullDesc: "We offer a full range of diagnostic and treatment options for epilepsy and other seizure disorders. Our team works to control seizures and improve quality of life through medication management, dietary therapies, and surgical options.",
            procedureSteps: [
                "Detailed medical history and seizure description.",
                "EEG (Electroencephalogram) monitoring.",
                "MRI or CT imaging.",
                "Medication trial and adjustment.",
                "Evaluation for epilepsy surgery if medication resistant."
            ],
            eligibility: "Patients with recurrent seizures or diagnosed epilepsy.",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "neuro-rehab",
            title: "Neuro Rehabilitation",
            shortDesc: "Therapies to restore function after neurological injury.",
            fullDesc: "Our neuro-rehabilitation program helps patients recover skills and independence after a stroke, brain injury, or other neurological condition. We offer physical, occupational, and speech therapy tailored to each patient's needs.",
            procedureSteps: [
                "Functional assessment by a multidisciplinary team.",
                "Goal setting with patient and family.",
                "Intensive physical, occupational, and speech therapy sessions.",
                "Use of assistive devices and technology.",
                "Discharge planning and home exercise programs."
            ],
            eligibility: "Patients recovering from stroke, traumatic brain injury, spinal cord injury, or degenerative diseases.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "memory-disorders",
            title: "Memory Disorders",
            shortDesc: "Diagnosis and care for Alzheimer's and dementia.",
            fullDesc: "Our Memory Disorders Clinic specializes in the early diagnosis and management of Alzheimer's disease and other forms of dementia. We provide compassionate care, family support, and access to clinical trials.",
            procedureSteps: [
                "Cognitive testing and neuropsychological evaluation.",
                "Brain imaging (MRI, PET scan).",
                "Blood tests to rule out reversible causes.",
                "Diagnosis and personalized care plan.",
                "Support groups and caregiver education."
            ],
            eligibility: "Individuals experiencing memory loss, confusion, or cognitive decline.",
            image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "headache-center",
            title: "Headache Center",
            shortDesc: "Specialized treatment for chronic migraines and headaches.",
            fullDesc: "We provide advanced management for chronic migraines, cluster headaches, and other severe headache disorders. Our approach includes medication, Botox injections, nerve blocks, and lifestyle modifications.",
            procedureSteps: [
                "Headache diary review and history taking.",
                "Neurological examination.",
                "Identification of triggers.",
                "Prescription of preventive and abortive medications.",
                "Interventional procedures (Botox, nerve blocks) if needed."
            ],
            eligibility: "Patients with chronic, severe, or debilitating headaches.",
            image: "https://images.unsplash.com/photo-1516574187841-693018954312?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "neuromuscular-disorders",
            title: "Neuromuscular Disorders",
            shortDesc: "Care for ALS, neuropathy, and myasthenia gravis.",
            fullDesc: "Our experts diagnose and treat disorders affecting the nerves and muscles, such as ALS, peripheral neuropathy, and myasthenia gravis. We offer electrodiagnostic testing (EMG/NCS) and comprehensive management.",
            procedureSteps: [
                "Clinical evaluation of muscle strength and sensation.",
                "Electromyography (EMG) and Nerve Conduction Studies (NCS).",
                "Genetic testing if indicated.",
                "Medication and immunotherapy.",
                "Multidisciplinary support (respiratory, physical therapy)."
            ],
            eligibility: "Patients with muscle weakness, numbness, or diagnosed neuromuscular conditions.",
            image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80"
        }
    ];

    return NextResponse.json(services);
}
