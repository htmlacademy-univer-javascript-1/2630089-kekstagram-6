function getMinutesFromTime(str) {
  const splitted = str.split(':');
  return +splitted[0] * 60 + +splitted[1];
}
function isMeetingOvertime(
  startWorkTime,
  endWorkTime,
  startMeetingTime,
  meetingDuration
) {
  const startWorkMinutes = getMinutesFromTime(startWorkTime);
  const endWorkMinutes = getMinutesFromTime(endWorkTime);
  const startMeetingMinutes = getMinutesFromTime(startMeetingTime);

  return (
    startWorkMinutes <= startMeetingMinutes &&
    startMeetingMinutes + meetingDuration < endWorkMinutes
  );
}
isMeetingOvertime('08:00', '17:30', '14:00', 90); // true
isMeetingOvertime('8:0', '10:0', '8:0', 120);     // true
isMeetingOvertime('08:00', '14:30', '14:00', 90); // false
isMeetingOvertime('14:00', '17:30', '08:0', 90);  // false
isMeetingOvertime('8:00', '17:30', '08:00', 900); // false
