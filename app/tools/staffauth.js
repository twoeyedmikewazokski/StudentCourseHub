import { createSession, deleteSession, getSession } from "../models/sessions.js";
import { setCookie, getCookies, deleteCookie} from "jsr:@std/http";

export function login(headers, { StaffID }) {
    console.log("!!!!!!!!!!!!")
    console.log(StaffID)
    const sessionId = createSession(StaffID);
    console.log(sessionId)
    setCookie(headers , {
        name: "sessionId",
        value: sessionId,
        path: "/"
    });
}

export function logout(headers, request) {
    const session = currentSession(request);
    deleteSession(session.id);
    deleteCookie(headers, "sessionId", { path: "/"});
}

export function currentSession(request) {
    const { sessionId } = getCookies(request.headers);
    return sessionId && getSession(sessionId);
}