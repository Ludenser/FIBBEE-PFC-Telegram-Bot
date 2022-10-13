import { Scenes } from 'telegraf';
import { SessionCtx } from '../global';
import divisionStep from '../scenes/DivisionStepScene/index';
import initStepScene from '../scenes/InitStepScene/index';

/**
  * Конструктор распределительной сцены
  */

export const initialScene = new Scenes.WizardScene<SessionCtx>('INITIAL_WIZARD_ID', divisionStep, initStepScene)


