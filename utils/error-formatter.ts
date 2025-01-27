import i18n from '@/i18n';

export default function getErrorMessage(statusCode: number): string {
  console.log('🚀 ~ getErrorMessage ~ statusCode:', statusCode);
  switch (statusCode) {
    case 400:
      return i18n.t('networkRequest.400');

    case 408:
      return i18n.t('networkRequest.408');
    case 408:
      return i18n.t('networkRequest.404');
    default:
      return i18n.t('networkRequest.network');
  }
}
