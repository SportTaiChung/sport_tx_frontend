import {post,get} from "../common";

export const getbetDayHistory = formData => post("/GameInfo/Ticket/betDayHistory", formData);
export const getbetHistory = formData => post("/GameInfo/Ticket/betHistory", formData);