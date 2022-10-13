import { Composer } from 'telegraf';
import openRouteComposer from './composers/openRoute.composer';
import closeRoute from './composers/closeRoute.composer';
import leaveScene from './composers/leaveScene.composer';
import { SessionCtx } from '../../global';

const divisionStep_scene = new Composer<SessionCtx>();
divisionStep_scene.use(
  closeRoute,
  leaveScene
)
divisionStep_scene.use(async (ctx, next) => {
  divisionStep_scene.use(
    ...openRouteComposer(ctx),
  )
  await next()
})
// divisionStep_scene.use(closeRoute)
// divisionStep_scene.use(leaveAction)

export default divisionStep_scene