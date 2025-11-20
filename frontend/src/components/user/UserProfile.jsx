function UserProfile() {
  return (
    <div className="w-full flex flex-col gap-10 px-4 py-6">

      {/* ======== PROFILE INFORMATION CARD ======== */}
      <div className="flex flex-col items-start p-6 gap-8 w-full bg-white border-l-4 border border-vision-secondary rounded-[14px] shadow-sm">

        {/* Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="font-inter font-medium text-[18px] text-[#0A0A0A]">
              Profile Information
            </h2>
            <p className="font-inter text-[15px] text-[#717182]">
              Update your personal details
            </p>
          </div>

          <button className="px-5 py-2 bg-gradient-to-b from-vision-header to-[rgba(110,133,195,0.8)] rounded-[10px] text-white font-inter font-medium text-[14px] shadow">
            Edit Profile
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-6 w-full">

          {/* First/Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* First Name */}
            <div className="flex flex-col gap-1 w-full">
              <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
                First Name
              </label>
              <div className="flex items-center px-3 py-2 bg-[#F3F3F5] rounded-[8px] text-[#0A0A0A]">
                Sarah
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1 w-full">
              <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
                Last Name
              </label>
              <div className="flex items-center px-3 py-2 bg-[#F3F3F5] rounded-[8px] text-[#0A0A0A]">
                Johnson
              </div>
            </div>
          </div>

          {/* DOB + Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Date of Birth */}
            <div className="flex flex-col gap-1 w-full">
              <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
                Date of Birth
              </label>
              <div className="flex items-center px-3 py-2 bg-[#F3F3F5] rounded-[8px] text-[#0A0A0A]">
                01/01/2000
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-1 w-full">
              <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
                Gender
              </label>
              <div className="flex flex-row gap-6 items-center">
                {/* Male */}
                <label className="flex flex-row items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    defaultChecked
                    className="w-4 h-4 rounded-full border border-[#2C2C2C]"
                  />
                  <span className="font-inter text-[15px] text-[#1E1E1E]">Male</span>
                </label>

                {/* Female */}
                <label className="flex flex-row items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="w-4 h-4 rounded-full border border-[#757575]"
                  />
                  <span className="font-inter text-[15px] text-[#1E1E1E]">Female</span>
                </label>
              </div>
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Email */}
            <div className="flex flex-col gap-1 w-full">
              <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
                Email
              </label>
              <div className="flex items-center px-3 py-2 bg-[#F3F3F5] rounded-[8px]">
                sarah.johnson@ivisionclinic.com
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1 w-full">
              <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
                Phone
              </label>
              <div className="flex items-center px-3 py-2 bg-[#F3F3F5] rounded-[8px]">
                (555) 234-5678
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
              Address
            </label>
            <div className="flex items-center px-3 py-2 bg-[#F3F3F5] rounded-[8px] text-[#0A0A0A]">
              456 Medical Plaza, Suite 200, New York, NY 10002
            </div>
          </div>
        </div>
      </div>

      {/* ======== PASSWORD CARD ======== */}
      <div className="flex flex-col items-start p-6 gap-8 w-full bg-white border-l-4 border border-vision-secondary rounded-[14px] shadow-sm">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="font-inter font-medium text-[18px] text-[#0A0A0A]">
            Change Password
          </h2>
          <p className="font-inter text-[15px] text-[#717182]">
            Update your password to keep your account secure
          </p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-6 w-full">

          {/* Current Password */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              className="px-3 py-2 w-full bg-[#F3F3F5] rounded-[8px] text-[#717182] text-[14px]"
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="px-3 py-2 w-full bg-[#F3F3F5] rounded-[8px] text-[#717182] text-[14px]"
            />
            <p className="text-[#6A7282] text-[14px]">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="px-3 py-2 w-full bg-[#F3F3F5] rounded-[8px] text-[#717182] text-[14px]"
            />
          </div>
        </div>

        <button className="px-5 py-2 bg-gradient-to-b from-vision-header to-[rgba(110,133,195,0.8)] rounded-[8px] text-white font-inter font-medium text-[14px] shadow">
          Change Password
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
