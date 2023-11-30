export default function add(database_instance) {
  //route for displaying screen in add new car file
    async function get_add_car(req, res) {
      try {
        //render screen
        res.render("addCar");
      } catch (err) {
        console.error("Error", err);
      }
    }
  //route for adding new car
    async function post_add_car(req, res) {
      try {
       //require body of html - reg number and description
       const {regNumber, description} = reg.body
       
        res.redirect("/addCar");
      } catch (err) {
        console.error("Error", err);
      }
    }
    return {
      get_add_car,
      post_add_car,
    };
  }
