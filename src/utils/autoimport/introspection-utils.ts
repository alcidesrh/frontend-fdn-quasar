export function typeFields(type) {
  cl(
    schema.value.filter((v) => v.name.startsWith("User")),
    schema.value[type.name],
  );
  let temp;
  return type.fields.map((f) => {
    temp = {};
    if (f.type.kind == "LIST") {
      if (schema.value.find((v) => v.name == f.type.ofType.name)) {
        temp[f.name] = ["id", "label"];
        return temp;
      }
    } else if (f.type.kind == "OBJECT") {
      temp[f.name] = ["id", "label"];
      return temp;
    }
    return f.name;
  });
}
