const requestAPI = async (e) => {
  try {
    const result = await fetch(`http://localhost:3001/${e}`);
    const data = await result.json();

    return data;
  } catch (error) {
    return console.log(error);
  }
};

export default requestAPI;