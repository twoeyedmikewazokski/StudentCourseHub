import { getModulesByModuleLeaderID } from "../models/modules.js";
import { getProgrammesByProgrammeLeaderID } from "../models/programmes.js";
import { getStaffById } from "../models/staff.js"
import { render } from "../tools/render.js";
import { staffMemberView } from "../views/staffMember.js";


export function staffMemberController({ staffId }) {
    try {
        const staffMember = getStaffById(staffId);
        const programmes = getProgrammesByProgrammeLeaderID(staffId);
        const modules = getModulesByModuleLeaderID(staffId);
        console.log(staffMember)
        console.log(programmes)
        console.log(modules)
        if (!staffMember) {
            return render(staffMemberView, {}, 404)
        }
        return render(staffMemberView, { staffMember, programmes, modules })
    } catch (error) {
        console.error(error)
    }
}