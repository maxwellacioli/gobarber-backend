import { Router } from 'express';
import appointmentsRouter from './apointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

routes.use(AuthMiddleware); //routes authenticated
routes.use('/appointments', appointmentsRouter);



export default routes;