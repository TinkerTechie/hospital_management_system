import { NextResponse } from 'next/server';

export async function GET() {
    const conditions = [
        {
            id: "stroke",
            name: "Stroke",
            description: "A stroke occurs when the blood supply to part of your brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients.",
            symptoms: [
                "Trouble speaking and understanding what others are saying.",
                "Paralysis or numbness of the face, arm or leg.",
                "Problems seeing in one or both eyes.",
                "Headache.",
                "Trouble walking."
            ],
            treatment: "Emergency IV medication (tPA), Endovascular procedures, Carotid endarterectomy, Angioplasty and stents.",
            image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "epilepsy",
            name: "Epilepsy",
            description: "Epilepsy is a central nervous system (neurological) disorder in which brain activity becomes abnormal, causing seizures or periods of unusual behavior, sensations, and sometimes loss of awareness.",
            symptoms: [
                "Temporary confusion.",
                "A staring spell.",
                "Stiff muscles.",
                "Uncontrollable jerking movements of the arms and legs.",
                "Loss of consciousness or awareness."
            ],
            treatment: "Anti-epileptic medications, Surgery, Vagus nerve stimulation, Ketogenic diet.",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "migraine",
            name: "Migraine",
            description: "A migraine is a headache that can cause severe throbbing pain or a pulsing sensation, usually on one side of the head. It's often accompanied by nausea, vomiting, and extreme sensitivity to light and sound.",
            symptoms: [
                "Pain usually on one side of your head, but often on both sides.",
                "Pain that throbs or pulses.",
                "Sensitivity to light, sound, and sometimes smell and touch.",
                "Nausea and vomiting."
            ],
            treatment: "Pain-relieving medications, Preventive medications, Lifestyle changes.",
            image: "https://images.unsplash.com/photo-1516574187841-693018954312?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "alzheimers",
            name: "Alzheimer's Disease",
            description: "Alzheimer's disease is a progressive neurologic disorder that causes the brain to shrink (atrophy) and brain cells to die. It is the most common cause of dementia.",
            symptoms: [
                "Memory loss.",
                "Difficulty thinking and reasoning.",
                "Making judgments and decisions.",
                "Planning and performing familiar tasks.",
                "Changes in personality and behavior."
            ],
            treatment: "Medications to maintain mental function, Managing behavior, Support services.",
            image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "parkinsons",
            name: "Parkinson's Disease",
            description: "Parkinson's disease is a progressive disorder that affects the nervous system and the parts of the body controlled by the nerves.",
            symptoms: [
                "Tremor.",
                "Slowed movement (bradykinesia).",
                "Rigid muscles.",
                "Impaired posture and balance.",
                "Loss of automatic movements."
            ],
            treatment: "Medications (Levodopa), Deep brain stimulation (DBS), Physical therapy.",
            image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "multiple-sclerosis",
            name: "Multiple Sclerosis (MS)",
            description: "Multiple sclerosis (MS) is a potentially disabling disease of the brain and spinal cord (central nervous system).",
            symptoms: [
                "Numbness or weakness in one or more limbs.",
                "Electric-shock sensations that occur with certain neck movements.",
                "Tremor, lack of coordination or unsteady gait.",
                "Vision problems."
            ],
            treatment: "Corticosteroids, Plasma exchange, Disease-modifying therapies.",
            image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80"
        }
    ];

    return NextResponse.json(conditions);
}
