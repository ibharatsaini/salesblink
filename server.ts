import app from './app'
import database from './lib/database';

const PORT = process.env.PORT || '8080'


const startServer =  async ()=>{
    await database();
    app.listen(PORT ,()=>{
        console.log(`Server listening at:`,PORT)
    })

}

startServer()

export default app