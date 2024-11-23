import { onMounted, ref } from 'vue'
import { useRouteHook } from '@/hooks/route'

export const useInvite = () => {
  const { query } = useRouteHook()
  const invite_uid = ref(0)
  const from_work_id = ref(0)
  const updateInviteData = () => {
    let uid = query?.invite_uid ?? localStorage.getItem('invite_uid')
    let wid = query?.from_work_id ?? localStorage.getItem('from_work_id')
    if (uid) {
      invite_uid.value = uid * 1
    }
    if (wid) {
      from_work_id.value = wid * 1
    }
  }

  onMounted(() => {
    updateInviteData()
  })

  return {
    invite_uid,
    from_work_id,
    updateInviteData
  }
}
