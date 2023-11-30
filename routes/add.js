export default function add(database_instance) {
  //route for displaying screen in add new car file
    async function get_add_car(req, res) {
      try {
        //render screen
        res.render("add");
      } catch (err) {
        console.error("Error", err);
      }
    }
  //route for adding new car
    async function post_add_car(req, res) {
      try {
       //require body of html - reg number and description
      const {description, regNumber} = req.body
      //database function to insert description and registration
      const add = await database_instance.addVehicle({description, regNumber})
      if (add.status === "error") {
        // If status is error, flash error message
        req.flash('error', add.message);
    } else {
        // If status is success, set flash success message
        req.flash('success', 'Vehicle added successfully');
    }
    //redirect to the add page
        res.redirect("/add");
      } catch (err) {
        console.error("Error", err);
      }
    }
    return {
      get_add_car,
      post_add_car,
    };
  }
