/**
 * toast.spec.ts
 *
 * Created by jake
 * Created on 2018-11-21
 *
 * Test ToastProvider.
 */
import { ToastProvider } from './toast';
import { provide } from '../../../../setup-jest';
import { ToastController } from '@ionic/angular';

describe('ToastProvider', () => {
  let underTest: ToastProvider;

  const mockToast = {
    present: jest.fn()
  };
  const mockToastController = {
    create: jest.fn()
  };
  beforeEach(() => {
    jest.resetAllMocks();
    mockToastController.create.mockResolvedValue(mockToast);
    underTest = new ToastProvider(mockToastController as unknown as ToastController);
  });

  it('should call toastCtrl.create with the error class and defaults and present', async () => {
    underTest.errorToast('error message');
    await mockToastController.create;
    await mockToast.present;
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: 'error message',
      cssClass: 'error-toast',
      duration: 3000,
      position: 'top'
    });
    expect(mockToast.present).toHaveBeenCalledTimes(1);
  });

  it('should call toastCtrl.create with the success class and defaults and present', async () => {
    underTest.successToast('success message');
    await mockToastController.create;
    await mockToast.present;
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: 'success message',
      cssClass: 'success-toast',
      duration: 3000,
      position: 'top'
    });
    expect(mockToast.present).toHaveBeenCalledTimes(1);
  });

  it('should create and present a toast with non default params', async () => {
    underTest.createToast('custom Message', 'custom-class', 5000, 'bottom');
    await mockToastController.create;
    await mockToast.present;
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
