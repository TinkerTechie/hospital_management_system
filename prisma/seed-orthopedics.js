const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding orthopedics data...');

    // Seed Orthopedic Services
    const services = [
        {
            serviceId: "joint-replacement",
            title: "Joint Replacement",
            shortDesc: "Advanced hip, knee, and shoulder replacement surgeries for pain-free mobility.",
            fullDesc: "Our joint replacement program uses the latest minimally invasive techniques and prosthetics to restore function and eliminate pain. We specialize in hip, knee, and shoulder replacements with rapid recovery protocols.",
            procedureSteps: [
                "Comprehensive pre-operative assessment and imaging.",
                "Minimally invasive surgical technique.",
                "High-quality prosthetic implant placement.",
                "Post-operative pain management.",
                "Structured physiotherapy and rehabilitation program."
            ],
            eligibility: "Patients with severe arthritis, joint damage, or chronic pain affecting daily activities.",
            image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "sports-medicine",
            title: "Sports Medicine",
            shortDesc: "Expert treatment for sports injuries and athletic performance optimization.",
            fullDesc: "Our sports medicine specialists treat acute and chronic sports injuries, helping athletes return to peak performance. We offer comprehensive care from diagnosis to rehabilitation.",
            procedureSteps: [
                "Detailed injury assessment and diagnosis.",
                "Advanced imaging (MRI, ultrasound).",
                "Customized treatment plan (surgical or non-surgical).",
                "Sport-specific rehabilitation program.",
                "Performance optimization and injury prevention."
            ],
            eligibility: "Athletes and active individuals with sports-related injuries or performance concerns.",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "fracture-care",
            title: "Fracture Care",
            shortDesc: "Comprehensive treatment for all types of bone fractures and breaks.",
            fullDesc: "We provide expert care for simple to complex fractures using modern fixation techniques. Our goal is optimal healing with minimal complications and rapid return to function.",
            procedureSteps: [
                "Emergency stabilization and pain relief.",
                "X-ray and CT imaging for accurate diagnosis.",
                "Closed reduction or surgical fixation as needed.",
                "Cast or brace application.",
                "Follow-up care and bone healing monitoring."
            ],
            eligibility: "Patients with acute fractures from trauma, falls, or accidents.",
            image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "spine-surgery",
            title: "Spine Surgery",
            shortDesc: "Advanced surgical solutions for spine disorders and back pain.",
            fullDesc: "Our spine surgeons perform minimally invasive procedures for herniated discs, spinal stenosis, scoliosis, and degenerative spine conditions. We prioritize conservative treatment first.",
            procedureSteps: [
                "Comprehensive spine evaluation and imaging.",
                "Conservative treatment trial (if appropriate).",
                "Minimally invasive surgical approach.",
                "Spinal decompression or fusion as needed.",
                "Structured post-operative rehabilitation."
            ],
            eligibility: "Patients with chronic back/neck pain, nerve compression, or spinal deformities.",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "arthroscopy",
            title: "Arthroscopy",
            shortDesc: "Minimally invasive joint surgery with faster recovery times.",
            fullDesc: "Arthroscopic surgery allows us to diagnose and treat joint problems through tiny incisions using a camera and specialized instruments. Less pain, smaller scars, quicker recovery.",
            procedureSteps: [
                "Small incisions (5-10mm) around the joint.",
                "Camera insertion for visualization.",
                "Repair of torn cartilage, ligaments, or removal of debris.",
                "Same-day or overnight discharge.",
                "Early mobilization and physiotherapy."
            ],
            eligibility: "Patients with joint pain, instability, or mechanical symptoms requiring surgical intervention.",
            image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "pediatric-orthopedics",
            title: "Pediatric Orthopedics",
            shortDesc: "Specialized care for children's bone and joint conditions.",
            fullDesc: "Our pediatric orthopedic specialists treat congenital deformities, growth plate injuries, scoliosis, and developmental disorders in children with age-appropriate techniques.",
            procedureSteps: [
                "Child-friendly examination and assessment.",
                "Growth and development monitoring.",
                "Non-surgical treatment (bracing, casting) when possible.",
                "Pediatric-specific surgical techniques if needed.",
                "Family education and long-term follow-up."
            ],
            eligibility: "Children and adolescents with bone, joint, or muscle conditions.",
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "rehabilitation",
            title: "Rehabilitation",
            shortDesc: "Comprehensive physiotherapy and recovery programs.",
            fullDesc: "Our rehabilitation center offers personalized physiotherapy programs to restore strength, flexibility, and function after injury or surgery. Expert therapists guide you every step.",
            procedureSteps: [
                "Initial assessment and goal setting.",
                "Customized exercise program.",
                "Manual therapy and modalities (heat, ice, ultrasound).",
                "Progressive strengthening and conditioning.",
                "Return-to-activity training."
            ],
            eligibility: "Post-surgical patients or those recovering from orthopedic injuries.",
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "trauma",
            title: "Trauma & Emergency",
            shortDesc: "24/7 emergency orthopedic care for acute injuries.",
            fullDesc: "Our trauma team is available round-the-clock to handle severe fractures, dislocations, and musculoskeletal injuries requiring immediate surgical intervention.",
            procedureSteps: [
                "Rapid triage and stabilization.",
                "Emergency imaging (X-ray, CT).",
                "Immediate surgical intervention if needed.",
                "ICU care for complex trauma.",
                "Coordinated rehabilitation planning."
            ],
            eligibility: "Patients with acute traumatic injuries requiring emergency orthopedic care.",
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
        }
    ];

    for (const service of services) {
        await prisma.orthopedicService.upsert({
            where: { serviceId: service.serviceId },
            update: service,
            create: service,
        });
    }
    console.log('✅ Seeded 8 orthopedic services');

    // Seed Orthopedic Conditions
    const conditions = [
        {
            conditionId: "osteoarthritis",
            name: "Osteoarthritis",
            description: "Degenerative joint disease causing cartilage breakdown, pain, and stiffness. Most common in knees, hips, hands, and spine.",
            symptoms: [
                "Joint pain that worsens with activity.",
                "Morning stiffness lasting less than 30 minutes.",
                "Reduced range of motion.",
                "Joint swelling and tenderness.",
                "Bone spurs and joint deformity in advanced cases."
            ],
            diagnosis: "Physical examination, X-rays showing joint space narrowing, MRI for detailed cartilage assessment.",
            treatment: "Weight management, physical therapy, pain medications (NSAIDs), joint injections (corticosteroids, hyaluronic acid), joint replacement surgery for severe cases.",
            prevention: "Maintain healthy weight, regular low-impact exercise, avoid joint injuries, strengthen muscles around joints.",
            image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80"
        },
        {
            conditionId: "rheumatoid-arthritis",
            name: "Rheumatoid Arthritis",
            description: "Autoimmune disorder causing chronic inflammation of joints, potentially affecting multiple joints symmetrically.",
            symptoms: [
                "Symmetrical joint pain and swelling.",
                "Morning stiffness lasting more than 1 hour.",
                "Fatigue and low-grade fever.",
                "Joint warmth and redness.",
                "Rheumatoid nodules under the skin."
            ],
            diagnosis: "Blood tests (RF, anti-CCP antibodies, ESR, CRP), X-rays, ultrasound or MRI for early detection.",
            treatment: "Disease-modifying antirheumatic drugs (DMARDs), biologics, corticosteroids, physical therapy, joint protection strategies, surgery for severe joint damage.",
            prevention: "Early diagnosis and treatment, smoking cessation, regular monitoring and medication adherence.",
            image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80"
        },
        {
            conditionId: "hip-knee-shoulder",
            name: "Hip, Knee & Shoulder Problems",
            description: "Common joint issues including bursitis, tendinitis, rotator cuff tears, meniscus tears, and labral tears affecting major joints.",
            symptoms: [
                "Localized pain in affected joint.",
                "Clicking, popping, or grinding sensations.",
                "Weakness or instability.",
                "Limited range of motion.",
                "Pain with specific movements or at night."
            ],
            diagnosis: "Physical examination, X-rays, MRI for soft tissue evaluation, arthroscopy for direct visualization.",
            treatment: "Rest and activity modification, physical therapy, anti-inflammatory medications, injections, arthroscopic repair or reconstruction, joint replacement for severe arthritis.",
            prevention: "Proper warm-up before exercise, strength training, avoid overuse, maintain flexibility, use proper technique in sports.",
            image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80"
        },
        {
            conditionId: "spine-disorders",
            name: "Spine Disorders",
            description: "Conditions affecting the spine including herniated discs, spinal stenosis, scoliosis, and degenerative disc disease.",
            symptoms: [
                "Back or neck pain.",
                "Radiating pain to arms or legs (sciatica).",
                "Numbness or tingling in extremities.",
                "Muscle weakness.",
                "Difficulty walking or maintaining balance."
            ],
            diagnosis: "Physical and neurological examination, X-rays, MRI or CT scans, nerve conduction studies if needed.",
            treatment: "Conservative care (physical therapy, medications, epidural injections), minimally invasive procedures, spinal decompression, fusion surgery for instability or severe cases.",
            prevention: "Maintain good posture, core strengthening exercises, proper lifting techniques, healthy weight, avoid prolonged sitting.",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
        },
        {
            conditionId: "fractures",
            name: "Fractures & Broken Bones",
            description: "Breaks in bone continuity ranging from hairline cracks to complete breaks, caused by trauma, overuse, or weakened bones.",
            symptoms: [
                "Severe pain at injury site.",
                "Swelling and bruising.",
                "Deformity or abnormal positioning.",
                "Inability to bear weight or use limb.",
                "Bone protruding through skin (open fracture)."
            ],
            diagnosis: "X-rays to confirm fracture and assess alignment, CT scan for complex fractures, MRI for stress fractures.",
            treatment: "Immobilization (cast, splint, brace), closed reduction for displaced fractures, surgical fixation (plates, screws, rods) for unstable fractures, bone grafting if needed.",
            prevention: "Fall prevention strategies, calcium and vitamin D supplementation, osteoporosis screening and treatment, protective gear during sports.",
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
        },
        {
            conditionId: "sports-injuries",
            name: "Sports Injuries",
            description: "Acute or overuse injuries affecting muscles, tendons, ligaments, and bones in athletes and active individuals.",
            symptoms: [
                "Sudden pain during activity.",
                "Swelling and inflammation.",
                "Reduced performance or inability to continue sport.",
                "Joint instability or giving way.",
                "Chronic pain with repetitive activities."
            ],
            diagnosis: "Sports medicine evaluation, functional testing, X-rays, MRI for soft tissue injuries, biomechanical assessment.",
            treatment: "RICE protocol (Rest, Ice, Compression, Elevation), physical therapy, bracing or taping, minimally invasive surgery (arthroscopy), sport-specific rehabilitation.",
            prevention: "Proper conditioning and training, adequate warm-up and cool-down, appropriate equipment, cross-training, rest and recovery periods.",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80"
        },
        {
            conditionId: "developmental-disorders",
            name: "Developmental Disorders",
            description: "Congenital or growth-related conditions in children including clubfoot, hip dysplasia, limb length discrepancy, and scoliosis.",
            symptoms: [
                "Visible deformity or asymmetry.",
                "Abnormal gait or limping.",
                "Delayed motor milestones.",
                "Pain or discomfort (in older children).",
                "Spinal curvature or uneven shoulders/hips."
            ],
            diagnosis: "Physical examination, X-rays, ultrasound (for infants), CT or MRI for complex cases, genetic testing if indicated.",
            treatment: "Early intervention with bracing or casting, physical therapy, growth monitoring, corrective surgery when necessary, long-term follow-up through skeletal maturity.",
            prevention: "Prenatal care, early screening (hip ultrasound for at-risk infants), genetic counseling, prompt treatment of detected abnormalities.",
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
        }
    ];

    for (const condition of conditions) {
        await prisma.orthopedicCondition.upsert({
            where: { conditionId: condition.conditionId },
            update: condition,
            create: condition,
        });
    }
    console.log('✅ Seeded 7 orthopedic conditions');

    // Seed Orthopedic Resources
    const resources = [
        {
            resourceId: "post-surgery-care",
            title: "Post-Surgery Care",
            icon: "FileText",
            color: "bg-blue-100 text-blue-600",
            description: "Complete guide to caring for yourself after orthopedic surgery.",
            content: [
                {
                    section: "First 24-48 Hours",
                    points: [
                        "Keep the surgical site clean and dry",
                        "Take prescribed pain medications as directed",
                        "Apply ice packs for 15-20 minutes every 2-3 hours",
                        "Keep the affected limb elevated above heart level",
                        "Monitor for signs of infection (fever, increased pain, redness)"
                    ]
                },
                {
                    section: "Week 1-2",
                    points: [
                        "Begin gentle range of motion exercises as instructed",
                        "Attend all follow-up appointments",
                        "Gradually increase activity as tolerated",
                        "Use assistive devices (crutches, walker) as prescribed",
                        "Maintain proper wound care and dressing changes"
                    ]
                },
                {
                    section: "Long-term Recovery",
                    points: [
                        "Follow physiotherapy program consistently",
                        "Gradually return to normal activities",
                        "Maintain healthy weight to reduce joint stress",
                        "Report any unusual symptoms to your doctor immediately"
                    ]
                }
            ],
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            resourceId: "exercise-videos",
            title: "Exercise Videos",
            icon: "Video",
            color: "bg-green-100 text-green-600",
            description: "Step-by-step video demonstrations of rehabilitation exercises.",
            content: [
                {
                    section: "Knee Exercises",
                    points: [
                        "Quadriceps sets - Tighten thigh muscles",
                        "Straight leg raises - Strengthen hip flexors",
                        "Heel slides - Improve knee flexion",
                        "Wall squats - Build leg strength",
                        "Step-ups - Functional strength training"
                    ]
                },
                {
                    section: "Shoulder Exercises",
                    points: [
                        "Pendulum swings - Gentle range of motion",
                        "Wall walks - Improve elevation",
                        "External rotation - Strengthen rotator cuff",
                        "Scapular squeezes - Improve posture",
                        "Resistance band exercises - Build strength"
                    ]
                },
                {
                    section: "Spine Exercises",
                    points: [
                        "Pelvic tilts - Core activation",
                        "Cat-cow stretches - Spinal mobility",
                        "Bird-dog - Core stability",
                        "Bridges - Strengthen glutes and core",
                        "Gentle twists - Improve rotation"
                    ]
                }
            ],
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            resourceId: "pain-management",
            title: "Pain Management",
            icon: "Stethoscope",
            color: "bg-purple-100 text-purple-600",
            description: "Strategies to manage pain and discomfort during recovery.",
            content: [
                {
                    section: "Medication Management",
                    points: [
                        "Take pain medications before pain becomes severe",
                        "Use non-opioid options when possible (acetaminophen, NSAIDs)",
                        "Follow prescribed dosing schedule carefully",
                        "Report side effects to your doctor",
                        "Never share or take someone else's pain medication"
                    ]
                },
                {
                    section: "Non-Medication Approaches",
                    points: [
                        "Ice therapy - Reduces inflammation and numbs pain",
                        "Heat therapy - Relaxes muscles and improves circulation",
                        "TENS unit - Electrical nerve stimulation",
                        "Relaxation techniques - Deep breathing, meditation",
                        "Proper positioning - Use pillows for support"
                    ]
                },
                {
                    section: "When to Call Your Doctor",
                    points: [
                        "Pain that worsens despite medication",
                        "New or different type of pain",
                        "Signs of infection (fever, redness, warmth)",
                        "Numbness or tingling that doesn't improve",
                        "Inability to perform daily activities"
                    ]
                }
            ],
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            resourceId: "recovery-timeline",
            title: "Recovery Timeline",
            icon: "Calendar",
            color: "bg-orange-100 text-orange-600",
            description: "What to expect during your recovery journey.",
            content: [
                {
                    section: "Week 1-2: Initial Recovery",
                    points: [
                        "Focus on rest and wound healing",
                        "Manage pain and swelling",
                        "Begin gentle movements",
                        "Use assistive devices as needed",
                        "Attend first follow-up appointment"
                    ]
                },
                {
                    section: "Week 3-6: Early Rehabilitation",
                    points: [
                        "Increase range of motion exercises",
                        "Begin strengthening program",
                        "Reduce reliance on assistive devices",
                        "Return to light daily activities",
                        "Continue physical therapy sessions"
                    ]
                },
                {
                    section: "Month 2-3: Progressive Recovery",
                    points: [
                        "Advance strengthening exercises",
                        "Improve balance and coordination",
                        "Increase walking distance and duration",
                        "Return to work (if cleared by doctor)",
                        "Begin sport-specific training (if applicable)"
                    ]
                },
                {
                    section: "Month 4-6: Advanced Recovery",
                    points: [
                        "Near-normal strength and function",
                        "Return to most activities",
                        "Continue home exercise program",
                        "Final follow-up appointments",
                        "Maintain long-term joint health"
                    ]
                }
            ],
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
    ];

    for (const resource of resources) {
        await prisma.orthopedicResource.upsert({
            where: { resourceId: resource.resourceId },
            update: resource,
            create: resource,
        });
    }
    console.log('✅ Seeded 4 orthopedic resources');

    console.log('🎉 Orthopedics data seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
