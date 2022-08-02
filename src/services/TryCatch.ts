const tryCatch = async (
  method: Function,
  setLoading: Function,
  prop: string | number
) => {
  try {
    setLoading(true);
    const data = await method(prop ? prop : "");
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export { tryCatch };
