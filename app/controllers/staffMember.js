import { getModulesByModuleLeaderID } from "../models/modules.js";
import { getProgrammesByProgrammeLeaderID } from "../models/programmes.js";
import { getStaffById } from "../models/staff.js"
import { render } from "../tools/render.js";
import { notFoundView } from "../views/notFound.js";
import { staffMemberView } from "../views/staffMember.js";


export function staffMemberController(ctx) {
    try {
        const { staffId } = ctx
        const staffMember = getStaffById(staffId);
        const programmes = getProgrammesByProgrammeLeaderID(staffId);
        const modules = getModulesByModuleLeaderID(staffId);
        console.log(staffMember)
        console.log(programmes)
        console.log(modules)
        if (!staffMember) {
            const status = 404
            return render(notFoundView, {}, { status })
        }
        return render(staffMemberView, { staffMember, programmes, modules }, ctx)
    } catch (error) {
        console.error(error)
    }
}