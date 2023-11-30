export default function all(database_instance) {
  // route function
  async function list_of_vehicles(req, res) {
    try {
      //display all vehicles
     const all_vehicles = await database_instance.vehicles()
      res.render("index", {all_vehicles});
    } catch (err) {
      console.error("Error", err);
    }
  }
  return {
    list_of_vehicles,
  };
}



