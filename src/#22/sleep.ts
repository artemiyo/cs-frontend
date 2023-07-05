function sleep(ms: number): Promise<any> {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

sleep(100).then(() => {
  console.log(`I'am awake!`);
});
