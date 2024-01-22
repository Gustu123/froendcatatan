const Realm = require("realm");
const { User } = require("./models/User");

const realm = new Realm({
    schema: [
        User,
    ]
})

export default realm