import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { Eye, Lock } from "lucide-react";

function DoctorProfile() {
  return (
    <Layout>
      <div className="w-full px-4 lg:px-[200px] py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar />

          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-black/10 p-6 flex flex-col gap-10">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex flex-col gap-2.5">
                  <h1 className="text-[#0A0A0A] text-base font-medium">Profile Information</h1>
                  <p className="text-[#717182] text-base">
                    Update your personal and professional details
                  </p>
                </div>
                <button className="bg-gradient-to-b from-[#1C398E] to-[rgba(110,133,195,0.8)] px-5 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  Edit Profile
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[#0A0A0A] text-sm font-medium">First Name</label>
                    <div className="bg-[#F3F3F5] opacity-50 rounded-lg px-3 py-2 text-[#0A0A0A] text-sm">
                      Sarah
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#0A0A0A] text-sm font-medium">Last Name</label>
                    <div className="bg-[#F3F3F5] opacity-50 rounded-lg px-3 py-2 text-[#0A0A0A] text-sm">
                      Johnson
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[#0A0A0A] text-sm font-medium">Date of Birth</label>
                    <div className="bg-[#F3F3F5] opacity-50 rounded-lg px-3 py-2 text-[#0A0A0A] text-sm">
                      01/01/2000
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#0A0A0A] text-sm font-medium">Gender</label>
                    <div className="flex items-center gap-6 py-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="w-4 h-4 rounded-full border-2 border-[#2C2C2C] flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#1E1E1E]" />
                        </div>
                        <span className="text-[#1E1E1E] text-base">Male</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="w-4 h-4 rounded-full border border-[#757575] bg-white" />
                        <span className="text-[#1E1E1E] text-base">Female</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[#0A0A0A] text-sm font-medium">Email</label>
                    <div className="bg-[#F3F3F5] opacity-50 rounded-lg px-3 py-2 text-[#0A0A0A] text-sm">
                      sarah.johnson@ivisionclinic.com
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#0A0A0A] text-sm font-medium">Phone</label>
                    <div className="bg-[#F3F3F5] opacity-50 rounded-lg px-3 py-2 text-[#0A0A0A] text-sm">
                      (555) 234-5678
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[#0A0A0A] text-sm font-medium">Address</label>
                  <div className="bg-[#F3F3F5] opacity-50 rounded-lg px-3 py-2 text-[#0A0A0A] text-sm">
                    456 Medical Plaza, Suite 200, New York, NY 10002
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[#0A0A0A] text-sm font-medium">Specialization</label>
                  <div className="bg-[#F3F3F5] opacity-50 rounded-lg px-3 py-2 text-[#0A0A0A] text-sm">
                    Ophthalmology
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[#0A0A0A] text-sm font-medium">License Number</label>
                    <div className="bg-[#F3F3F5] opacity-50 rounded-lg px-3 py-2 text-[#0A0A0A] text-sm">
                      MD-987654
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#0A0A0A] text-sm font-medium">Years of Experience</label>
                    <div className="bg-[#F3F3F5] opacity-50 rounded-lg px-3 py-2 text-[#0A0A0A] text-sm">
                      12
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[#0A0A0A] text-sm font-medium">Education</label>
                  <div className="bg-[#F3F3F5] opacity-50 rounded-lg px-3 py-2 text-[#0A0A0A] text-sm h-16">
                    MD, Harvard Medical School; Residency in Ophthalmology, Johns Hopkins Hospital
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[#0A0A0A] text-sm font-medium">Bio</label>
                  <div className="bg-[#F3F3F5] opacity-50 rounded-lg px-3 py-2 text-[#717182] text-sm h-20">
                    Tell us about yourself and your expertise...
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-black/10 p-6 flex flex-col gap-10">
              <div className="flex flex-col gap-2.5">
                <h2 className="text-[#0A0A0A] text-base font-medium">Change Password</h2>
                <p className="text-[#717182] text-base">
                  Update your password to keep your account secure
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[#0A0A0A] text-sm font-medium">Current Password</label>
                  <div className="bg-[#F3F3F5] rounded-lg px-3 py-2 flex justify-between items-center">
                    <input
                      type="password"
                      placeholder="Enter current password"
                      className="bg-transparent border-none outline-none text-[#0A0A0A] text-sm flex-1 placeholder:text-[#717182]"
                    />
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-[#0A0A0A]" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[#0A0A0A] text-sm font-medium">New Password</label>
                  <div className="bg-[#F3F3F5] rounded-lg px-3 py-2 flex justify-between items-center">
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="bg-transparent border-none outline-none text-[#0A0A0A] text-sm flex-1 placeholder:text-[#717182]"
                    />
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-[#0A0A0A]" />
                    </button>
                  </div>
                  <p className="text-[#6A7282] text-sm mt-1">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[#0A0A0A] text-sm font-medium">Confirm New Password</label>
                  <div className="bg-[#F3F3F5] rounded-lg px-3 py-2 flex justify-between items-center">
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="bg-transparent border-none outline-none text-[#0A0A0A] text-sm flex-1 placeholder:text-[#717182]"
                    />
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-[#0A0A0A]" />
                    </button>
                  </div>
                </div>

                <button className="bg-gradient-to-b from-[#1C398E] to-[rgba(110,133,195,0.8)] px-5 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity w-fit">
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default DoctorProfile
