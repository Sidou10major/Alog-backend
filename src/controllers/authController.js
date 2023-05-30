const prisma = require("./prismaClient");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const con = require("../../connection");

const register = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    const hashedPassword = await bcrypt.hash(password, 5);
    // await prisma.user.create({
    //     data: { username, password: hashedPassword },
    // });
    const sql = "insert into user (username, password) values (?, ?)";
    con.query(sql, [username, hashedPassword], (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to register user' });
        } else {
            res.status(201).json({ message: 'User registered successfully' });
        }
    })
}


const login = async (req, res) => {
    // try {
    //     const { username, password } = req.body;
    //     const user = await prisma.user.findUnique({ where: { username } });
    //     if (!user) {
    //         return res.status(404).json({ error: 'User not found' });
    //     }
    //     const passwordMatch = await bcrypt.compare(password, user.password);
    //     if (!passwordMatch) {
    //         return res.status(401).json({ error: 'Invalid credentials' });
    //     }
    //     const token = jwt.sign({ userId: user.id }, 'secretKey'); // Replace 'secretKey' with your own secret key
    //     res.json({ token });
    //     logActivity(`User '${username}' logged in`);
    // } catch (error) {
    //     res.status(500).json({ error: 'Failed to login' });
    // }
    const { username, password } = req.body;
    const sql = "select * from user where username = ?";
    con.query(sql, [username], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        } else {
            if(result.length === 0) {
                res.status(404).json({ message: "no user found" });
            } else {
                const user = result[0];
                const passwordMatch = bcrypt.compareSync(password, user.password);
                if(!passwordMatch) {
                    res.status(401).json({ error: 'Invalid credentials' });
                } else {
                    const token = jwt.sign({ userId: user.id }, 'secretKey');
                    res.json({ token });
                }
            }
        }
    })

}

  
const authenticate = (req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'secretKey');
      const userId = decoded.userId;

      const sql = "select * from user where id = ?";
      con.query(sql, [userId], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ message: "internal error"});
        } else {
            if(result.length === 0) {
                res.status(401).json({ message: "unauthorized" });
            } else {
                req.user = result[0];
                next();
            }
        }
      })
};


  module.exports = {
    register , 
    login ,
    authenticate
  }