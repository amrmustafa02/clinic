export class ApiData {

  static baseUrl = "http://localhost:5000";
  static signUpEndPoint = "/auth/signUp";
  static loginEndPoint = "/auth/signin";
  static addSlotEndPoint = "/slot";
  static getDoctors = "/user/GetDoctorWithSlots";
  static search = "/user/searchByDoctorName";
  static appointment = "/appointment/";
  static myAppointment = "/appointment";
  static geeDoctorSlotById = "/user/getSlotByDrId/";
  static updateAppointment = "/appointment/updateAppointment/";

}
