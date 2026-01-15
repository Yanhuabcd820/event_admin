type Status = 'online' | 'offlineManual' | 'offlineExpired' | 'draft'

type Activity = {
  title: string,
  id:string,
  status:Status,
  createdAt:string,
  updatedAt:string,
  startAt:string,
  dueAt:string,
}


type ActivityForm = {
  title: string,
  startAt:string,
  dueAt:string,
}