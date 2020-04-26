export function snapshotOneOfList(snapshot: any) {
  if (snapshot.empty) {
    return Promise.reject({
      error: {
        message: "No matching documents.",
      },
    })
  }
  let data = {}
  snapshot.forEach((doc: any) => {
    data = {
      id: doc.id,
      ...doc.data(),
    }
  })
  return data
}

export function snapshotAll(snapshot: any) {
  if (snapshot.empty) {
    return Promise.reject({
      error: {
        message: "No matching documents.",
      },
    })
  }
  const data: any[] = []
  snapshot.forEach((doc: any) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    })
  })
  return data
}

export function snapshotOne(snapshot: any) {
  // oc.exists
  if (snapshot.empty) {
    return Promise.reject({
      error: {
        message: "No matching documents.",
      },
    })
  }
  return {
    id: snapshot.id,
    ...snapshot.data(),
  }
}

export function getResultBeforeSnap(result: any) {
  return result.get()
}

export function loggingSuccess(action?: string) {
  return (result: any) => {
    console.log(action, " success", " => ", result)
    return result
  }
}

export function loggingError(action?: string) {
  return (error: any) => {
    console.log(action, " error", action, " => ", error)
    return Promise.reject(error)
  }
}

export function removeUserNameAndPassword(data: any) {
  const {
    account: { userName, password, ...accountRest },
    ...rest
  } = data
  return {
    ...rest,
    account: accountRest,
  }
}
