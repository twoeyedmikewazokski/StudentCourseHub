import { getAllStaffUsers } from "../models/staff.js";
import { render } from "../tools/render.js";
import { staffView } from "../views/staff.js";

export function staffListController() {
    try {
        const staff = getAllStaffUsers();
        console.log(staff);
        return render(staffView, { staff });
    } catch (error) {
        console.error(error);
    }

}