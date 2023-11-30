export default function refuel(database_instance) {
    // route function
    async function get_refuel(req, res) {
      try {
        
        res.render("refuel");
      } catch (err) {
        console.error("Error", err);
      }
    }

    async function post_refuel(req, res) {
        try {
          
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