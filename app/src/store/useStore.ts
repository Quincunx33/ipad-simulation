import { create } from 'zustand';
import type { Notification, BootStage, UpdateState, ComponentState } from '@/types';

interface iPadStore {
  // Device state
  isPoweredOn: boolean;
  bootStage: BootStage;
  currentApp: string | null;
  previousApps: string[];

  // System
  iosVersion: string;
  currentTime: Date;
  isLocked: boolean;
  isAuthenticated: boolean;
  brightness: number;
  volume: number;

  // Display
  isTrueToneOn: boolean;
  isNightShiftOn: boolean;
  isDarkMode: boolean;
  autoLockTime: number;

  // Connectivity
  isAirplaneMode: boolean;
  isWifiOn: boolean;
  wifiNetwork: string;
  isBluetoothOn: boolean;
  isCellularOn: boolean;
  signalStrength: number;
  batteryLevel: number;
  isCharging: boolean;

  // Audio
  isMuted: boolean;
  isDndOn: boolean;

  // Apps
  openApps: string[];
  appSwitcherOpen: boolean;
  notifications: Notification[];

  // Settings
  settingsOpen: boolean;
  currentSettingsPage: string | null;

  // Update
  updateState: UpdateState;
  updateProgress: number;
  availableUpdate: { version: string; size: string } | null;

  // Repair
  isRepairMode: boolean;
  repairStep: number;
  selectedTool: string | null;
  selectedComponent: string | null;
  componentStates: Record<string, ComponentState>;
  screwsRemaining: number;

  // Spotlight
  spotlightOpen: boolean;
  searchQuery: string;

  // Control Center
  controlCenterOpen: boolean;

  // Notification Center
  notificationCenterOpen: boolean;

  // Multitasking
  splitViewActive: boolean;
  splitViewPrimaryApp: string | null;
  splitViewSecondaryApp: string | null;
  slideOverApp: string | null;
  stageManagerActive: boolean;
  activeIconOrigin: { x: number; y: number } | null;

  // Actions
  setActiveIconOrigin: (origin: { x: number; y: number } | null) => void;
  powerOn: () => void;
  powerOff: () => void;
  setBootStage: (stage: BootStage) => void;
  unlock: () => void;
  lock: () => void;
  launchApp: (app: string) => void;
  closeApp: () => void;
  goHome: () => void;
  openAppSwitcher: () => void;
  closeAppSwitcher: () => void;
  toggleControlCenter: () => void;
  setControlCenterOpen: (open: boolean) => void;
  toggleNotificationCenter: () => void;
  setNotificationCenterOpen: (open: boolean) => void;
  toggleSpotlight: () => void;
  setSearchQuery: (query: string) => void;
  setBrightness: (v: number) => void;
  setVolume: (v: number) => void;
  toggleTrueTone: () => void;
  toggleNightShift: () => void;
  toggleDarkMode: () => void;
  toggleAirplaneMode: () => void;
  toggleWifi: () => void;
  toggleBluetooth: () => void;
  toggleDnd: () => void;
  toggleMute: () => void;
  startUpdate: () => void;
  cancelUpdate: () => void;
  setUpdateProgress: (p: number) => void;
  setUpdateState: (state: UpdateState) => void;
  completeUpdate: (version: string) => void;
  enterRepairMode: () => void;
  exitRepairMode: () => void;
  setRepairStep: (step: number) => void;
  selectTool: (tool: string | null) => void;
  selectComponent: (component: string | null) => void;
  damageComponent: (component: string) => void;
  removeScrew: () => void;
  addNotification: (notification: Notification) => void;
  clearNotification: (id: string) => void;
  openSplitView: (primary: string, secondary: string) => void;
  closeSplitView: () => void;
  openSlideOver: (app: string) => void;
  closeSlideOver: () => void;
  toggleStageManager: () => void;
  setCurrentTime: (time: Date) => void;
}

export const useStore = create<iPadStore>((set, get) => ({
  // Initial state
  isPoweredOn: true,
  bootStage: 'booting',
  currentApp: null,
  previousApps: [],
  iosVersion: 'iOS 26.0',
  currentTime: new Date(),
  isLocked: true,
  isAuthenticated: false,
  brightness: 0.85,
  volume: 0.7,
  isTrueToneOn: true,
  isNightShiftOn: false,
  isDarkMode: false,
  autoLockTime: 120,
  isAirplaneMode: false,
  isWifiOn: true,
  wifiNetwork: 'HomeNetwork',
  isBluetoothOn: true,
  isCellularOn: true,
  signalStrength: 4,
  batteryLevel: 0.36,
  isCharging: false,
  isMuted: false,
  isDndOn: false,
  openApps: [],
  appSwitcherOpen: false,
  notifications: [
    {
      id: '1',
      app: 'Messages',
      appIcon: 'messages',
      title: 'Tasfia',
      body: 'Hey! Did you see the new iOS update? It looks amazing!',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
    },
    {
      id: '2',
      app: 'Mail',
      appIcon: 'mail',
      title: 'Apple',
      body: 'Your invoice is ready for viewing.',
      timestamp: new Date(Date.now() - 30 * 60000),
      read: false,
    },
    {
      id: '3',
      app: 'Calendar',
      appIcon: 'calendar',
      title: 'Team Meeting',
      body: 'Today at 2:00 PM - Conference Room B',
      timestamp: new Date(Date.now() - 2 * 3600000),
      read: false,
    },
  ],
  settingsOpen: false,
  currentSettingsPage: null,
  updateState: 'idle',
  updateProgress: 0,
  availableUpdate: { version: 'iOS 26.1', size: '1.2 GB' },
  isRepairMode: false,
  repairStep: 0,
  selectedTool: null,
  selectedComponent: null,
  componentStates: {},
  screwsRemaining: 28,
  spotlightOpen: false,
  searchQuery: '',
  controlCenterOpen: false,
  notificationCenterOpen: false,
  splitViewActive: false,
  splitViewPrimaryApp: null,
  splitViewSecondaryApp: null,
  slideOverApp: null,
  stageManagerActive: false,
  activeIconOrigin: null,

  // Actions
  setActiveIconOrigin: (origin) => set({ activeIconOrigin: origin }),
  powerOn: () => set({ isPoweredOn: true, bootStage: 'booting' }),
  powerOff: () => set({
    isPoweredOn: false,
    bootStage: 'off',
    currentApp: null,
    isLocked: true,
    isAuthenticated: false,
  }),
  setBootStage: (stage) => set({ bootStage: stage }),
  unlock: () => set({ isAuthenticated: true, bootStage: 'homescreen', isLocked: false }),
  lock: () => set({ isLocked: true, isAuthenticated: false, bootStage: 'lockscreen', currentApp: null }),
  launchApp: (app) => {
    const state = get();
    const updatedOpenApps = state.openApps.includes(app)
      ? state.openApps
      : [...state.openApps, app];
    if (state.currentApp) {
      set({ previousApps: [...state.previousApps, state.currentApp] });
    }
    set({ currentApp: app, bootStage: 'app', openApps: updatedOpenApps,
          appSwitcherOpen: false, controlCenterOpen: false, notificationCenterOpen: false });
  },
  closeApp: () => {
    const state = get();
    const prev = [...state.previousApps];
    const lastApp = prev.pop() || null;
    set({
      currentApp: lastApp,
      previousApps: prev,
      bootStage: lastApp ? 'app' : 'homescreen',
    });
  },
  goHome: () => set({
    currentApp: null,
    previousApps: [],
    bootStage: 'homescreen',
    appSwitcherOpen: false,
    controlCenterOpen: false,
    notificationCenterOpen: false,
  }),
  openAppSwitcher: () => set({ appSwitcherOpen: true }),
  closeAppSwitcher: () => set({ appSwitcherOpen: false }),
  toggleControlCenter: () => set((s) => ({
    controlCenterOpen: !s.controlCenterOpen,
    notificationCenterOpen: false,
  })),
  setControlCenterOpen: (open) => set({ controlCenterOpen: open }),
  toggleNotificationCenter: () => set((s) => ({
    notificationCenterOpen: !s.notificationCenterOpen,
    controlCenterOpen: false,
  })),
  setNotificationCenterOpen: (open) => set({ notificationCenterOpen: open }),
  toggleSpotlight: () => set((s) => ({ spotlightOpen: !s.spotlightOpen })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setBrightness: (v) => set({ brightness: v }),
  setVolume: (v) => set({ volume: v }),
  toggleTrueTone: () => set((s) => ({ isTrueToneOn: !s.isTrueToneOn })),
  toggleNightShift: () => set((s) => ({ isNightShiftOn: !s.isNightShiftOn })),
  toggleDarkMode: () => set((s) => ({ isDarkMode: !s.isDarkMode })),
  toggleAirplaneMode: () => set((s) => ({
    isAirplaneMode: !s.isAirplaneMode,
    isWifiOn: s.isAirplaneMode ? true : false,
    isBluetoothOn: s.isAirplaneMode ? true : false,
    isCellularOn: s.isAirplaneMode ? true : false,
  })),
  toggleWifi: () => set((s) => ({ isWifiOn: !s.isWifiOn })),
  toggleBluetooth: () => set((s) => ({ isBluetoothOn: !s.isBluetoothOn })),
  toggleDnd: () => set((s) => ({ isDndOn: !s.isDndOn })),
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
  startUpdate: () => set({ updateState: 'checking', updateProgress: 0 }),
  cancelUpdate: () => set({ updateState: 'idle', updateProgress: 0 }),
  setUpdateProgress: (p) => set({ updateProgress: p }),
  setUpdateState: (state) => set({ updateState: state }),
  completeUpdate: (version) => set({
    iosVersion: version,
    updateState: 'idle',
    updateProgress: 0,
    bootStage: 'homescreen',
  }),
  enterRepairMode: () => set({ isRepairMode: true, repairStep: 0, selectedTool: null, selectedComponent: null }),
  exitRepairMode: () => set({ isRepairMode: false, repairStep: 0, selectedTool: null, selectedComponent: null }),
  setRepairStep: (step) => set({ repairStep: step }),
  selectTool: (tool) => set({ selectedTool: tool }),
  selectComponent: (component) => set({ selectedComponent: component }),
  damageComponent: (component) => set((s) => ({
    componentStates: { ...s.componentStates, [component]: 'damaged' },
  })),
  removeScrew: () => set((s) => ({ screwsRemaining: Math.max(0, s.screwsRemaining - 1) })),
  addNotification: (notification) => set((s) => ({
    notifications: [notification, ...s.notifications].slice(0, 20),
  })),
  clearNotification: (id) => set((s) => ({
    notifications: s.notifications.filter((n) => n.id !== id),
  })),
  openSplitView: (primary, secondary) => set({
    splitViewActive: true,
    splitViewPrimaryApp: primary,
    splitViewSecondaryApp: secondary,
    currentApp: null,
  }),
  closeSplitView: () => set({ splitViewActive: false, splitViewPrimaryApp: null, splitViewSecondaryApp: null }),
  openSlideOver: (app) => set({ slideOverApp: app }),
  closeSlideOver: () => set({ slideOverApp: null }),
  toggleStageManager: () => set((s) => ({ stageManagerActive: !s.stageManagerActive })),
  setCurrentTime: (time) => set({ currentTime: time }),
}));
