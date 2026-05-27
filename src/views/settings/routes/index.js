import SettingsEmbed from '@/views/settings/SettingsEmbed.vue'
import SettingsSyncKey from '@/views/settings/SettingsSyncKey.vue'

export default [
  {
    path: "/:organization/settings/embed",
    name: "settings-embed",
    component: SettingsEmbed,
  },
  {
    path: "/:organization/settings/sync-key",
    name: "settings-sync-key",
    component: SettingsSyncKey,
  }
]
