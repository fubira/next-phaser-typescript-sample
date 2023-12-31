/**
 * PixelUI global theme
 */
import { Theme } from './Theme';
export { type ThemeStyles } from './Theme';
export const theme = new Theme();

/**
 * PixelUI component factory
 */
import { DebugInfoFactory } from './component/DebugInfo';
import { TextLabelFactory } from './component/TextLabel';
import { BackgroundFactory } from './component/Background';
import { LoadingProgressFactory } from './component/LoadingProgress';
import { DialogFactory } from './component/Dialog';
import { ButtonFactory } from './component/Button';
import { BackdropFactory } from './component/Backdrop';
import { ToastFactory } from './component/Toast';
import { ToggleButtonFactory } from './component/ToggleButton';

export const add = {
  debugInfo: DebugInfoFactory,
  textLabel: TextLabelFactory,
  background: BackgroundFactory,
  loadingProgerss: LoadingProgressFactory,
  dialog: DialogFactory,
  button: ButtonFactory,
  toggleButton: ToggleButtonFactory,
  backdrop: BackdropFactory,
  toast: ToastFactory,
};

/**
 * PixelUI component class and styles
 */
export { DebugInfo } from './component/DebugInfo';
export { LoadingProgress } from './component/LoadingProgress';
export { TextLabel, type TextLabelStyle } from './component/TextLabel';
export { Dialog, type DialogStyle } from './component/Dialog';
export { Toast, type ToastStyle } from './component/Toast';
export { Button, type ButtonStyle } from './component/Button';
export { Backdrop, type BackdropStyle } from './component/Backdrop';
export { ToggleButton, type ToggleButtonStyle } from './component/ToggleButton';

/**
 * PixelUI types
 */
export * from './Types';
