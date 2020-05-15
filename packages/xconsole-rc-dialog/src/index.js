import open from './promised/open';
import slide from './promised/slide';
import alert from './promised/alts/alert';
import confirm from './promised/alts/confirm';
import prompt from './promised/alts/prompt';
import hocDialogContent from './hoc/content';
import hocWrapper from './hoc/wrapper';

export default from './rc/dialog';

export {
  open,
  slide,
  alert,
  confirm,
  prompt,
  hocDialogContent,
  hocWrapper
};