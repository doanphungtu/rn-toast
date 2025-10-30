import { StyleSheet } from 'react-native';

export const MIN_HEIGHT = 40;
export const BORDER_RADIUS = 1000;

export const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    width: '90%',
    borderRadius: BORDER_RADIUS,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: BORDER_RADIUS,
    elevation: 1,
    backgroundColor: '#FFF',
    minHeight: MIN_HEIGHT,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#000',
    width: '100%',
  },
  message: {
    fontSize: 10,
    color: '#979797',
    width: '100%',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
  },
  iconCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  iconText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
  },
});
