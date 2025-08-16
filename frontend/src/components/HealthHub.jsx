import React, { useMemo, useState } from "react";
import {
    ArrowLeft,
    Phone,
    Ambulance,
    Hospital,
    Stethoscope,
    Droplet,
    Activity,
    MapPin,
    Users,
    Bed,
    Syringe,
    Thermometer,
    AlertTriangle,
    Bell,
    Search,
    Filter,
    Database,
    Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HealthHub() {
    const navigate = useNavigate();

    // ----- Demo Data (static) -----
    const [alerts] = useState([
        { type: "urgent", text: "O− blood urgently required at City Hospital (Contact: 033-1234567)" },
        { type: "info", text: "Free health camp on Sunday 10 AM at Green Valley Medical" },
        { type: "advisory", text: "Heatwave alert: Stay hydrated and avoid peak sun hours" },
    ]);

    const [analytics] = useState({
        hospitals: 12,
        workers: 86,
        ambulances: 18,
        bloodUnits: 462,
    });

    const [inventory, setInventory] = useState({
        beds: 240,
        icuBeds: 36,
        oxygen: 120,
        ventilators: 24,
        ppeKits: 900,
        ambulances: 18,
        blood: { "A+": 110, "B+": 92, "O+": 168, "A-": 20, "B-": 15, "O-": 12, "AB+": 35, "AB-": 10 },
    });

    const hospitals = [
        { name: "City Hospital", beds: 80, icu: 12, oxygen: 40, ventilators: 8, blood: "A+, O+", ambulances: 4, hotline: "033-1234567" },
        { name: "Green Valley Medical", beds: 40, icu: 8, oxygen: 30, ventilators: 6, blood: "B+, AB+", ambulances: 3, hotline: "033-2233445" },
        { name: "Sunrise Clinic", beds: 25, icu: 4, oxygen: 15, ventilators: 2, blood: "O−, A−", ambulances: 1, hotline: "033-3344556" },
        { name: "Rural Care Centre", beds: 18, icu: 2, oxygen: 10, ventilators: 1, blood: "A+", ambulances: 0, hotline: "035-7788990" },
    ];

    const healthWorkers = [
        { name: "Dr. A. Sharma", role: "Cardiologist", available: true },
        { name: "Dr. R. Banerjee", role: "Pediatrician", available: true },
        { name: "Nurse Priya", role: "ICU Nurse", available: true },
        { name: "Rahul Singh", role: "Volunteer", available: false },
    ];

    const doctorsDirectory = useMemo(() => [
        { name: "Dr. Meera Iyer", spec: "Dermatology", hospital: "City Hospital", available: true },
        { name: "Dr. Amit Roy", spec: "Cardiology", hospital: "Green Valley Medical", available: false },
        { name: "Dr. Sana Ali", spec: "Gynecology", hospital: "Sunrise Clinic", available: true },
        { name: "Dr. Vikram Bose", spec: "Orthopedics", hospital: "City Hospital", available: true },
        { name: "Dr. K. Sen", spec: "General Medicine", hospital: "Rural Care Centre", available: true },
    ], []);

    const ngos = [
        { name: "Health For All", contact: "+91 98000 11111", focus: "Blood donation drives" },
        { name: "Rural Care Initiative", contact: "+91 98000 22222", focus: "Mobile medical camps" },
        { name: "LifeAid Foundation", contact: "+91 98000 33333", focus: "Maternal health" },
    ];

    // ----- Directory filters (static UI logic) -----
    const [specFilter, setSpecFilter] = useState("All");
    const [docQuery, setDocQuery] = useState("");
    const specs = useMemo(() => ["All", ...new Set(doctorsDirectory.map(d => d.spec))], [doctorsDirectory]);

    const filteredDoctors = useMemo(() => {
        return doctorsDirectory.filter(d => {
            const bySpec = specFilter === "All" || d.spec === specFilter;
            const byQuery = (d.name + d.spec + d.hospital).toLowerCase().includes(docQuery.toLowerCase());
            return bySpec && byQuery;
        });
    }, [doctorsDirectory, specFilter, docQuery]);

    // ----- Hospital-side quick update (still local only) -----
    const [updateForm, setUpdateForm] = useState({ beds: "", oxygen: "", ventilators: "" });
    const applyUpdate = (e) => {
        e.preventDefault();
        setInventory(prev => ({
            ...prev,
            beds: updateForm.beds ? Number(updateForm.beds) : prev.beds,
            oxygen: updateForm.oxygen ? Number(updateForm.oxygen) : prev.oxygen,
            ventilators: updateForm.ventilators ? Number(updateForm.ventilators) : prev.ventilators,
        }));
        setUpdateForm({ beds: "", oxygen: "", ventilators: "" });
    };

    // ----- Citizen Help Request (no backend) -----
    const [helpForm, setHelpForm] = useState({ name: "", phone: "", need: "Ambulance", details: "" });
    const submitHelp = (e) => {
        e.preventDefault();
        alert(`Request submitted!\nName: ${helpForm.name}\nNeed: ${helpForm.need}`);
        setHelpForm({ name: "", phone: "", need: "Ambulance", details: "" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
            {/* Top Bar with Back */}
            <div className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b" style={{ backgroundColor: "#1d3878" }}>
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
                    <button onClick={() => navigate("/")} className="flex items-center mr-4 p-1 text-white  hover:bg-blue-500 rounded-lg">
                        <ArrowLeft className="w-5 h-5 m-1" />
                    </button>
                    <h1 className="text-xl font-bold text-white items-center">Collaborative Health Resource Hub</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Analytics Snapshot */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <KpiCard icon={<Hospital className="w-7 h-7" />} label="Hospitals" value={analytics.hospitals} />
                    <KpiCard icon={<Users className="w-7 h-7" />} label="Health Workers" value={analytics.workers} />
                    <KpiCard icon={<Ambulance className="w-7 h-7" />} label="Ambulances" value={analytics.ambulances} />
                    <KpiCard icon={<Droplet className="w-7 h-7" />} label="Blood Units" value={analytics.bloodUnits} />
                </div>

                {/* Alerts */}
                <section className="mb-6 bg-gray-100 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                        <Bell className="w-5 h-5 text-amber-600" />
                        <h2 className="text-lg font-semibold text-cyan-800">Live Alerts</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                        {alerts.map((a, i) => (
                            <div key={i} className={`p-3 rounded-xl border shadow-sm ${a.type === "urgent" ? "bg-red-50 border-red-200" : a.type === "advisory" ? "bg-amber-50 border-amber-200" : "bg-cyan-50 border-cyan-200"
                                }`}>
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 mt-0.5" />
                                    <p className="text-sm text-gray-800">{a.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="grid grid-cols-1 rounded-xl sm:grid-cols-3 gap-4 mb-8">
                    <div className="rounded-2xl shadow-md drop-shadow-gray-700">
                        <ActionCard icon={<Hospital className=" text-cyan-600" />} title="Contact Hospital" subtitle="Reach nearest hospitals">
                            <a href="tel:0331234567" className="inline-block px-3 py-2 rounded-lg text-sm bg-cyan-600 text-white hover:bg-cyan-700">Call: 033-1234567</a>
                        </ActionCard>
                    </div>
                    <div className="rounded-2xl shadow-md drop-shadow-gray-700">
                        <ActionCard icon={<Ambulance className=" text-red-600" />} title="Call Ambulance" subtitle="Emergency 24/7">
                            <a href="tel:108" className="inline-block px-3 py-2 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700">Dial 108</a>
                        </ActionCard>
                    </div>
                    <div className="rounded-2xl shadow-md drop-shadow-gray-700">
                        <ActionCard icon={<Stethoscope className=" text-green-600" />} title="Find Health Workers" subtitle="Doctors, nurses & volunteers">
                            <button className="inline-block px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">Open Directory</button>
                        </ActionCard>
                    </div>

                </section>

                {/* Inventory & Hospital Updates */}
                <section className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Inventory Summary */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
                        <Header title="Health Resource Inventory" icon={<Database className="w-5 h-5" />} />
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <StatSmall label="Beds" value={inventory.beds} />
                            <StatSmall label="ICU Beds" value={inventory.icuBeds} />
                            <StatSmall label="Oxygen Cylinders" value={inventory.oxygen} />
                            <StatSmall label="Ventilators" value={inventory.ventilators} />
                            <StatSmall label="PPE Kits" value={inventory.ppeKits} />
                            <StatSmall label="Ambulances" value={inventory.ambulances} />
                        </div>
                        <div className="mt-6">
                            <h4 className="font-semibold text-cyan-800 mb-2 flex items-center gap-2"><Droplet className="w-4 h-4" /> Blood Bank Units</h4>
                            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                                {Object.entries(inventory.blood).map(([group, val]) => (
                                    <div key={group} className="bg-cyan-50 border border-cyan-100 rounded-lg p-2 text-center">
                                        <div className="text-xs text-gray-500">{group}</div>
                                        <div className="text-base font-semibold text-cyan-700">{val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Update Form (local only) */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <Header title="Hospital Update" icon={<Calendar className="w-5 h-5" />} />
                        <form onSubmit={applyUpdate} className="space-y-3">
                            <Input label="Beds" type="number" value={updateForm.beds} onChange={v => setUpdateForm(f => ({ ...f, beds: v }))} />
                            <Input label="Oxygen Cylinders" type="number" value={updateForm.oxygen} onChange={v => setUpdateForm(f => ({ ...f, oxygen: v }))} />
                            <Input label="Ventilators" type="number" value={updateForm.ventilators} onChange={v => setUpdateForm(f => ({ ...f, ventilators: v }))} />
                            <button type="submit" className="w-full py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700">Save Update</button>
                        </form>
                    </div>
                </section>

                {/* Hospital Resource Table */}
                <section className="bg-white rounded-2xl shadow p-6 mb-8">
                    <Header title="Hospital Resources" icon={<Hospital className="w-5 h-5" />} />
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-cyan-100">
                                <tr>
                                    <Th>Hospital</Th>
                                    <Th>Beds</Th>
                                    <Th>ICU</Th>
                                    <Th>Oxygen</Th>
                                    <Th>Ventilators</Th>
                                    <Th>Blood Groups</Th>
                                    <Th>Ambulances</Th>
                                    <Th>Hotline</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {hospitals.map((h, i) => (
                                    <tr key={i} className="border-t">
                                        <Td className="font-medium">{h.name}</Td>
                                        <Td center>{h.beds}</Td>
                                        <Td center>{h.icu}</Td>
                                        <Td center>{h.oxygen}</Td>
                                        <Td center>{h.ventilators}</Td>
                                        <Td center>{h.blood}</Td>
                                        <Td center>{h.ambulances}</Td>
                                        <Td>
                                            <a href={`tel:${h.hotline.replace(/[^0-9]/g, "")}`} className="text-cyan-700 hover:underline">{h.hotline}</a>
                                        </Td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Doctors Directory with Filters */}
                <section className="bg-white rounded-2xl shadow p-6 mb-8">
                    <Header title="Doctor & Specialist Directory" icon={<Stethoscope className="w-5 h-5" />} />
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <div className="flex-1 relative">
                            <input
                                value={docQuery}
                                onChange={(e) => setDocQuery(e.target.value)}
                                placeholder="Search by name, specialty or hospital"
                                className="w-full border rounded-lg px-10 py-2"
                            />
                            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
                        </div>
                        <div>
                            <select value={specFilter} onChange={(e) => setSpecFilter(e.target.value)} className="border rounded-lg px-3 py-2">
                                {specs.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredDoctors.map((d, i) => (
                            <div key={i} className="border rounded-xl p-4 hover:shadow transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold text-cyan-800">{d.name}</div>
                                        <div className="text-sm text-gray-600">{d.spec} • {d.hospital}</div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${d.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {d.available ? 'Available' : 'Busy'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* NGOs & Volunteers */}
                <section className="grid lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow p-6">
                        <Header title="NGO Partners" icon={<Users className="w-5 h-5" />} />
                        <div className="space-y-3">
                            {ngos.map((n, i) => (
                                <div key={i} className="p-3 border rounded-xl flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">{n.name}</div>
                                        <div className="text-sm text-gray-600">{n.focus}</div>
                                    </div>
                                    <a href={`tel:${n.contact.replace(/[^0-9+]/g, '')}`} className="text-cyan-700 hover:underline">{n.contact}</a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6">
                        <Header title="Register as Volunteer" icon={<Users className="w-5 h-5" />} />
                        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Thanks for registering as a volunteer!') }}>
                            <Input label="Full Name" value={""} onChange={() => { }} placeholder="Your Name" />
                            <Input label="Phone" value={""} onChange={() => { }} placeholder="Your Phone" />
                            <button className="w-full py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700">Register</button>
                        </form>
                    </div>
                </section>

                {/* Map Placeholder & Citizen Help */}
                <section className="grid lg:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white rounded-2xl shadow p-6">
                        <Header title="Nearby Health Centres (Map)" icon={<MapPin className="w-5 h-5" />} />
                        <div className="h-64 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 grid place-items-center text-gray-500">
                            Map coming soon
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6">
                        <Header title="Request Help" icon={<Phone className="w-5 h-5" />} />
                        <form onSubmit={submitHelp} className="space-y-3">
                            <Input label="Name" value={helpForm.name} onChange={(v) => setHelpForm(f => ({ ...f, name: v }))} />
                            <Input label="Phone" value={helpForm.phone} onChange={(v) => setHelpForm(f => ({ ...f, phone: v }))} />
                            <div>
                                <label className="text-sm text-gray-600">Type of Help</label>
                                <select value={helpForm.need} onChange={(e) => setHelpForm(f => ({ ...f, need: e.target.value }))} className="w-full border rounded-lg px-3 py-2 mt-1">
                                    <option>Ambulance</option>
                                    <option>Blood</option>
                                    <option>Bed</option>
                                    <option>Oxygen</option>
                                    <option>Doctor</option>
                                </select>
                            </div>
                            <Textarea label="Details" value={helpForm.details} onChange={(v) => setHelpForm(f => ({ ...f, details: v }))} placeholder="Describe your need with location" />
                            <button className="w-full py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700">Submit Request</button>
                        </form>
                    </div>
                </section>

                {/* Footer note */}
                <p className="text-md text-gray-500 text-center pb-2">Made with ❤️ by HealthBridge</p>
            </div>
        </div>
    );
}

// ---------- Small UI helpers (pure Tailwind) ----------
function Header({ title, icon }) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <div className="text-cyan-700">{icon}</div>
            <h3 className="text-lg font-semibold text-cyan-800">{title}</h3>
        </div>
    );
}

function KpiCard({ icon, label, value }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
                {icon}
                <span>{label}</span>
            </div>
            <div className="text-2xl font-bold text-cyan-800 mt-1">{value}</div>
        </div>
    );
}

function StatSmall({ label, value }) {
    return (
        <div className="p-4 bg-cyan-50 border border-cyan-100 rounded-xl text-center">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="text-xl font-semibold text-cyan-800">{value}</div>
        </div>
    );
}

function ActionCard({ icon, title, subtitle, children }) {
    return (
        <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <div className="text-cyan-700">{icon}</div>
                <div>
                    <div className="font-semibold text-cyan-900">{title}</div>
                    <div className="text-sm text-gray-600">{subtitle}</div>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}

function Input({ label, value, onChange, type = "text", placeholder }) {
    return (
        <div>
            {label && <label className="text-sm text-gray-600">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border rounded-lg px-3 py-2 mt-1"
            />
        </div>
    );
}

function Textarea({ label, value, onChange, placeholder }) {
    return (
        <div>
            {label && <label className="text-sm text-gray-600">{label}</label>}
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={4}
                className="w-full border rounded-lg px-3 py-2 mt-1"
            />
        </div>
    );
}

function Th({ children }) { return <th className="p-2 text-left text-gray-700 text-xs uppercase tracking-wide">{children}</th>; }
function Td({ children, center, className = "" }) { return <td className={`p-2 ${center ? 'text-center' : ''} ${className}`}>{children}</td>; }

// Utility button styles
// (Tailwind classes grouped for quick-action anchors)
const _btn = "inline-block px-3 py-2 rounded-lg text-sm";
const _primary = "bg-cyan-600 text-white hover:bg-cyan-700";
const _danger = "bg-red-600 text-white hover:bg-red-700";
const _muted = "bg-gray-100 text-gray-700 hover:bg-gray-200";

// Expose class helpers to JSX via global definitions
// (not exported; used as className on <a> / <button>)



