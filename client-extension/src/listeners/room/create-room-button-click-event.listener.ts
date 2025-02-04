export async function createRoomButtonEvnetListener(event: SubmitEvent) {
  event.preventDefault();

  const target = event.target as HTMLFormElement;
  console.log(target);
}
