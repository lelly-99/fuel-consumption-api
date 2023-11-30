export default function refuel(database_instance) {
    // route function
    //function to show a selection of vehicles that have been added so a user can selecte and refuel
    async function get_refuel(req, res) {
        try {
            // display all
         const all_vehicles = await database_instance.vehicles()
         // rende all the added vehicles
          res.render("refuel", {all_vehicles});
        } catch (err) {
          console.error("Error", err);
        }
      }

    async function post_refuel(req, res) {
        try {
            //require body of html - liters, amount, distance, filled_up
            const {id, liters, amount, distance, filled_up } = req.body;
    
        // Call the refuel function with the provided details
        const refuel = await database_instance.refuel(id, liters, amount, distance, filled_up);
        //if none of none of the inputs are filled, return error message
        if (refuel.status === "error") {
            //if the staus is error 
            req.flash('error', refuel.message);
        } else {
            req.flash('success', 'Vehicle has been refueled sucessfully');
        }
          res.redirect('/refuel');
        } catch (err) {
          console.error("Error", err);
        }
      }
    return {
      get_refuel,
      post_refuel
    };
  }            

