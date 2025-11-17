function UserProfile() {
  return (
    <>
      <div className="flex flex-col items-start p-6 gap-10 w-[784px] h-[414px] bg-white border border-black/10 rounded-[14px]">
        {/* Title */}
        <div className="flex flex-row justify-start items-start w-[736px] h-[50px]">
          {/* Container */}
          <div className="flex flex-col items-start gap-2 w-[218px] h-[50px]">
            {/* CardTitle */}
            <div className="flex flex-row justify-start items-center gap-2 w-[141px] h-[16px]">
              <span className="font-inter font-medium text-[16px] leading-[16px] text-[#0A0A0A]">
                Profile Information
              </span>
            </div>

            {/* CardDescription */}
            <div className="flex flex-row justify-start items-center gap-2 w-[218px] h-[24px]">
              <span className="font-inter font-normal text-[16px] leading-[24px] text-[#717182]">
                Update your personal details
              </span>
            </div>
          </div>

          {/* Button */}
          <button className="flex flex-row justify-center items-center gap-2 px-5 py-2 w-[113px] h-[36px] ml-auto bg-gradient-to-b from-[#1C398E] to-[rgba(110,133,195,0.8)] rounded-[10px]">
            <span className="font-inter font-medium text-[14px] leading-[20px] text-white">
              Edit Profile
            </span>
          </button>
        </div>

        {/* Detail */}
        <div className="flex flex-col gap-4 w-[736px]">
          {/* Name */}
          <div className="flex flex-row gap-5 w-[736px] h-[55px]">
            {/* First Name */}
            <div className="flex flex-col gap-1 w-[358px] h-[55px]">
              <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
                First Name
              </label>
              <div className="flex items-center px-3 py-1 w-[358px] h-[36px] bg-[#F3F3F5] opacity-50 rounded-[8px]">
                <span className="font-inter text-[14px] text-[#0A0A0A]">Sarah</span>
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1 w-[358px] h-[55px]">
              <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
                Last Name
              </label>
              <div className="flex items-center px-3 py-1 w-[358px] h-[36px] bg-[#F3F3F5] opacity-50 rounded-[8px]">
                <span className="font-inter text-[14px] text-[#0A0A0A]">Johnson</span>
              </div>
            </div>
          </div>

          {/* Date of Birth + Gender */}
          <div className="flex flex-row gap-5 w-[736px] h-[55px]">
            {/* Date of Birth */}
            <div className="flex flex-col gap-1 w-[358px] h-[55px]">
              <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
                Date of Birth
              </label>
              <div className="flex items-center px-3 py-1 w-[358px] h-[36px] bg-[#F3F3F5] opacity-50 rounded-[8px]">
                <span className="font-inter text-[14px] text-[#0A0A0A]">01/01/2000</span>
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-1 w-[358px] h-[55px]">
              <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
                Gender
              </label>
              <div className="flex flex-row gap-6 items-center w-[358px] h-[36px]">
                {/* Male */}
                <label className="flex flex-row items-center gap-3">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    defaultChecked
                    className="w-4 h-4 rounded-full border border-[#2C2C2C]"
                  />
                  <span className="font-inter text-[16px] text-[#1E1E1E]">Male</span>
                </label>

                {/* Female */}
                <label className="flex flex-row items-center gap-3">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="w-4 h-4 rounded-full border border-[#757575]"
                  />
                  <span className="font-inter text-[16px] text-[#1E1E1E]">Female</span>
                </label>
              </div>
            </div>
          </div>

          {/* Email + Phone */}
          <div className="flex flex-row gap-5 w-[736px] h-[55px]">
            {/* Email */}
            <div className="flex flex-col gap-1 w-[358px] h-[55px]">
              <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
                Email
              </label>
              <div className="flex items-center px-3 py-1 w-[358px] h-[36px] bg-[#F3F3F5] opacity-50 rounded-[8px]">
                <span className="font-inter text-[14px] text-[#0A0A0A]">
                  sarah.johnson@ivisionclinic.com
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1 w-[358px] h-[55px]">
              <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
                Phone
              </label>
              <div className="flex items-center px-3 py-1 w-[358px] h-[36px] bg-[#F3F3F5] opacity-50 rounded-[8px]">
                <span className="font-inter text-[14px] text-[#0A0A0A]">(555) 234-5678</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1 w-[736px] h-[50px]">
            <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
              Address
            </label>
            <div className="flex items-center px-3 py-1 w-[736px] h-[36px] bg-[#F3F3F5] opacity-50 rounded-[8px]">
              <span className="font-inter text-[14px] text-[#0A0A0A]">
                456 Medical Plaza, Suite 200, New York, NY 10002
              </span>
            </div>
          </div>
        </div>
      </div>
      {/*Password */}
      <div className="flex flex-col items-start p-6 gap-10 w-[784px] h-[414px] bg-white border border-black/10 rounded-[14px]">
        {/* CardHeader */}
        <div className="flex flex-col items-start gap-2 w-[392px] h-[50px]">
          {/* CardTitle */}
          <div className="flex flex-row justify-center items-center gap-2 w-[139px] h-[16px]">
            <span className="font-inter font-medium text-[16px] leading-[16px] text-[#0A0A0A]">
              Change Password
            </span>
          </div>

          {/* CardDescription */}
          <div className="flex flex-row justify-center items-center gap-2 w-[392px] h-[24px]">
            <span className="font-inter font-normal text-[16px] leading-[24px] text-[#717182]">
              Update your password to keep your account secure
            </span>
          </div>
        </div>

        {/* CardContent */}
        <div className="flex flex-col gap-4 w-[734px] h-[274px]">
          {/* Current Password */}
          <div className="flex flex-col gap-1 w-[734px] h-[55px]">
            <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              className="flex items-center px-3 py-1 w-[734px] h-[36px] bg-[#F3F3F5] rounded-[8px] text-[#717182] text-[14px]"
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1 w-[734px] h-[80px]">
            <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="flex items-center px-3 py-1 w-[734px] h-[36px] bg-[#F3F3F5] rounded-[8px] text-[#717182] text-[14px]"
            />
            <p className="text-[#6A7282] text-[14px] leading-[20px]">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-1 w-[734px] h-[55px]">
            <label className="font-inter font-medium text-[14px] text-[#0A0A0A]">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="flex items-center px-3 py-1 w-[734px] h-[36px] bg-[#F3F3F5] rounded-[8px] text-[#717182] text-[14px]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="flex flex-row items-center px-5 py-2 gap-2 w-[186px] h-[36px] bg-gradient-to-b from-[#1C398E] to-[rgba(110,133,195,0.8)] rounded-[8px] text-white font-inter font-medium text-[14px]">
          Change Password
        </button>
      </div>
    </>
  );
}

export default UserProfile