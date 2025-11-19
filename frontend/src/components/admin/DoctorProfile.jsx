import {
  ArrowLeft, User, Mail, Phone, MapPin,
  Calendar, Award, GraduationCap, FileText,
} from "lucide-react";

const DoctorProfile = ({ doctorId, users, onBack }) => {
  const doctor = users.find((u) => u.id === doctorId && u.role === "doctor");

  if (!doctor) {
    return (
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-[10px] border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Appointments
        </button>
        <p className="mt-4 text-red-600 text-sm">Doctor not found.</p>
      </div>
    );
  }

  const initials = `${doctor.firstName?.[0] || ""}${doctor.lastName?.[0] || ""
    }`.toUpperCase();

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-[10px] border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Appointments
      </button>

      {/* Header Card */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-5 md:px-6 md:py-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="h-20 w-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-semibold">
              {doctor.profilePicture ? (
                <img
                  src={doctor.profilePicture}
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
          </div>

          {/* Main Info */}
          <div className="flex-1">
            {/* Doctor Name */}
            <h2 className="text-xl font-semibold text-gray-900">
              Dr. {doctor.firstName} {doctor.lastName}
            </h2>

            {/* Badges */}
            <div className="mt-2 flex flex-wrap gap-2">
              {doctor.specialization && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {doctor.specialization}
                </span>
              )}
              {doctor.licenseNumber && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {doctor.licenseNumber}
                </span>
              )}
            </div>

            {/* Contact Info (Two Columns) */}
            <div className="mt-4 grid md:grid-cols-2 gap-y-2 text-sm text-gray-800">

              {/* LEFT COLUMN */}
              <div className="space-y-2">
                {/* Email */}
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{doctor.email || "—"}</span>
                </div>

                {/* Address */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{doctor.address || "—"}</span>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-2">
                {/* Phone */}
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{doctor.phone || "—"}</span>
                </div>

                {/* Joined Date */}
                {doctor.joinDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Joined {doctor.joinDate}</span>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Professional Information */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-5 md:px-6 md:py-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Professional Information
          </h3>
          <p className="text-xs md:text-sm text-gray-500">
            Education, experience, and credentials
          </p>
        </div>

        {/* Experience + License */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-blue-50 px-4 py-3 border border-blue-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-blue-700">
                Years of Experience
              </p>
              <p className="text-sm text-gray-900">
                {doctor.yoe ? `${doctor.yoe} years` : "—"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 border border-emerald-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-emerald-700">
                Medical License
              </p>
              <p className="text-sm text-gray-900">
                {doctor.licenseNumber || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Education */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-50 text-purple-600">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">
              Education &amp; Training
            </h4>
          </div>
          <div className="rounded-2xl bg-purple-50 border border-purple-100 px-4 py-3 text-sm text-gray-900">
            {doctor.education || "—"}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Biography */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 text-gray-600">
              <User className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">
              Professional Biography
            </h4>
          </div>
          <div className="rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3 text-sm text-gray-900 leading-relaxed">
            {doctor.bio ||
              "No biography has been provided for this doctor yet."}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorProfile;
