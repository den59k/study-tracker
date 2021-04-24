import { useRouter } from "providers/router"
import { parseIm } from 'statics/url'
import useSWR from "swr"
import Header from "."

export default function HeaderIm () {

	const router = useRouter()
	const { group_id, subject_id } = parseIm(router.get(1))

	const { data: groupInfo } = useSWR(group_id?('/api/teacher/groups/'+group_id): null)
	const { data: subjectInfo } = useSWR(subject_id?('/api/teacher/subjects/'+subject_id): null)

	if(!groupInfo || !subjectInfo) return <Header/>

	return (
		<Header backTo={"/subjects/"+subject_id} title={subjectInfo.subjectData.title + ' - ' + groupInfo.groupInfo.title}>

		</Header>
	)
}