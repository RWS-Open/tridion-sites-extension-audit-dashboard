const formatUser = (data: any[], type:string) => {
  const counts = data.reduce((acc:any, item:any) => {
    const name = item[type];
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const result = Object.keys(counts).map((name) => ({
    name,
    value: counts[name],
  }));

  return result;
}

export default formatUser;