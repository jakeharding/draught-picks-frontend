/**
 * toast.spec.ts
 *
 * Created by jake
 * Created on 2018-11-21
 *
 * Test ToastProvider.
 */
import { ToastProvider } from './toast';
import { mockToast, mockToastController, provide } from '../../jestGlobalMocks';

describe('ToastProvider', () => {
  let underTest: ToastProvider;

  beforeEach(() => {
    underTest = new ToastProvider(provide(mockToastController));
  });

  it('should call toastCtrl.create with the error class and defaults and present', () => {
    underTest.errorToast('error message');
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: 'error message',
      cssClass: 'error-toast',
      duration: 3000,
      position: 'top'
    });
    expect(mockToast.present).toHaveBeenCalledTimes(1);
  });

  it('should call toastCtrl.create with the success class and defaults and present', () => {
    underTest.successToast('success message');
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: 'success message',
      cssClass: 'success-toast',
      duration: 3000,
      position: 'top'
    });
    expect(mockToast.present).toHaveBeenCalledTimes(1);
  });

  it('should create and present a toast with non default params', () => {
    underTest.createToast('custom Message', 'custom-class', 5000, 'bottom');
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: 'custom Message',
      cssClass: 'custom-class',
      duration: 5000,
      position: 'bottom'
    });
    expect(mockToast.present).toHaveBeenCalledTimes(1);
  });
});
