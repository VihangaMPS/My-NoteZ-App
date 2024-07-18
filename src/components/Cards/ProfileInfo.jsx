import {getInitials} from "../../utils/helper.js";

const ProfileInfo = ({onLogout}) => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
                {getInitials("MP Vihanga")}
            </div>

            <div>
                <p className="text-sm font-medium">Willam</p>
                <button className="text-sm text-slate-700 underline" onClick={() => {}}>Logout</button>
            </div>
        </div>
    )
}

export default ProfileInfo;