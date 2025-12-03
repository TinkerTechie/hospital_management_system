# Global Search Enhancement Plan

## Current Status

**Implementation:** Frontend-only with hardcoded search index  
**Limitation:** Cannot search database content (patients, doctors, appointments, etc.)

## Recommended Enhancement

### 1. Create Global Search API Route

**File:** `app/api/search/route.js`

```javascript
import { NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/apiHelpers";
import { prisma } from "@/lib/db";

export async function GET(request) {
  // Verify authentication
  const auth = await verifyAuthToken();
  if (!auth.success) return auth.response;

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const userRole = auth.decoded.role;
    const results = {
      patients: [],
      doctors: [],
      appointments: [],
      services: [],
    };

    // Search based on user role
    if (["ADMIN", "DOCTOR", "NURSE"].includes(userRole)) {
      // Search patients
      results.patients = await prisma.patient.findMany({
        where: {
          fullName: { contains: query, mode: "insensitive" },
        },
        take: limit,
        select: {
          id: true,
          fullName: true,
          age: true,
          bloodGroup: true,
        },
      });

      // Search doctors
      results.doctors = await prisma.doctor.findMany({
        where: {
          OR: [
            { fullName: { contains: query, mode: "insensitive" } },
            { specialization: { contains: query, mode: "insensitive" } },
          ],
        },
        take: limit,
        select: {
          id: true,
          fullName: true,
          specialization: true,
          department: true,
        },
      });
    }

    if (["ADMIN", "PATIENT"].includes(userRole)) {
      // Search appointments (for patient: their own, for admin: all)
      const appointmentWhere =
        userRole === "PATIENT"
          ? { patientId: auth.decoded.id }
          : {};

      results.appointments = await prisma.appointment.findMany({
        where: {
          ...appointmentWhere,
          OR: [
            { patient: { fullName: { contains: query, mode: "insensitive" } } },
            { doctor: { fullName: { contains: query, mode: "insensitive" } } },
          ],
        },
        take: limit,
        include: {
          patient: { select: { fullName: true } },
          doctor: { select: { fullName: true } },
        },
      });
    }

    // Add static services (from frontend index)
    results.services = getStaticServices(query).slice(0, limit);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}

// Helper function for static content
function getStaticServices(query) {
  const services = [
    { id: 'cardiology', title: 'Cardiology', type: 'service', url: '/services/cardiology' },
    { id: 'neurology', title: 'Neurology', type: 'service', url: '/services/neurology' },
    // ... add all static services
  ];

  return services.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );
}
```

### 2. Update GlobalSearch Component

**File:** `app/components/GlobalSearch.js`

Add API integration:

```javascript
// Add state for API results
const [apiResults, setApiResults] = useState({
  patients: [],
  doctors: [],
  appointments: [],
});
const [loading, setLoading] = useState(false);

// Add API search function
useEffect(() => {
  const searchAPI = async () => {
    if (!query.trim() || query.length < 2) {
      setApiResults({ patients: [], doctors: [], appointments: [] });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
      if (res.ok) {
        const data = await res.json();
        setApiResults(data.results);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce API calls
  const timer = setTimeout(searchAPI, 300);
  return () => clearTimeout(timer);
}, [query]);

// Combine static and API results
const allResults = [
  ...results, // Static results
  ...apiResults.patients.map(p => ({
    id: `patient-${p.id}`,
    title: p.fullName,
    category: 'Patient',
    description: `${p.age} yrs • ${p.bloodGroup}`,
    url: `/dashboard/admin/patients?id=${p.id}`,
  })),
  ...apiResults.doctors.map(d => ({
    id: `doctor-${d.id}`,
    title: d.fullName,
    category: 'Doctor',
    description: d.specialization,
    url: `/dashboard/admin/doctors?id=${d.id}`,
  })),
  // ... add appointments
];
```

## Benefits of API-Based Search

✅ **Search Database Content**
- Patients, doctors, appointments
- Medical records
- Inventory items
- Any dynamic data

✅ **Role-Based Results**
- Patients see only their data
- Doctors see their patients
- Admins see everything

✅ **Real-Time Data**
- Always up-to-date
- No hardcoded content

✅ **Better Performance**
- Server-side filtering
- Pagination support
- Optimized queries

## Implementation Priority

### Phase 1: Basic API Search (Recommended Now)
- Create `/api/search/route.js`
- Search patients, doctors, appointments
- Integrate with GlobalSearch component

### Phase 2: Advanced Features (Later)
- Full-text search with PostgreSQL
- Search medical records
- Search history
- Recent searches
- Autocomplete suggestions

### Phase 3: Optimization (Future)
- Elasticsearch integration
- Search analytics
- Typo tolerance
- Fuzzy matching

## Quick Start

1. Create `app/api/search/route.js` with the code above
2. Update `app/components/GlobalSearch.js` to call the API
3. Test with different user roles
4. Deploy to Render

## Current vs Enhanced

| Feature | Current | Enhanced |
|---------|---------|----------|
| Static Pages | ✅ Yes | ✅ Yes |
| Database Search | ❌ No | ✅ Yes |
| Role-Based | ❌ No | ✅ Yes |
| Real-Time | ❌ No | ✅ Yes |
| API Calls | ❌ No | ✅ Yes |

---

**Status:** Enhancement Recommended  
**Priority:** Medium  
**Effort:** 2-3 hours
