import Community from '../models/community.model'
import Thread from '../models/thread.model'
import User from '../models/user.model'

export const createCommunity = async (
  clerkId: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  createdById: string
) => {
  try {
    // Find the user with the provided unique id
    const user = await User.findOne({ clerkId: createdById })

    if (!user) {
      throw new Error('User not found') // Handle the case if the user with the id is not found
    }

    const createdCommunity = await Community.create({
      clerkId,
      name,
      username,
      image,
      bio,
      createdBy: user._id
    })

    // Update User model
    if (!user.communities.includes(createdCommunity._id)) {
      user.communities.push(createdCommunity._id)
      await user.save()
    }

    return createdCommunity
  } catch (error) {
    throw error
  }
}

export const addMemberToCommunity = async (communityClerkId: string, memberClerkId: string) => {
  try {
    // Find the community by its unique id
    const community = await Community.findOne({ clerkId: communityClerkId })

    if (!community) {
      throw new Error('Community not found')
    }

    // Find the user by their unique id
    const user = await User.findOne({ clerkId: memberClerkId })

    if (!user) {
      throw new Error('User not found')
    }

    // // Check if the user is already a member of the community
    // if (community.members.includes(user._id)) {
    //   throw new Error('User is already a member of the community')
    // }

    // // Add the user's _id to the members array in the community
    // community.members.push(user._id)
    // // await community.save()

    // // Add the community's _id to the communities array in the user
    // user.communities.push(community._id)
    // // await user.save()

    // await Promise.all([community.save(), user.save()])

    if (!community.members.includes(user._id)) {
      community.members.push(user._id)
      await community.save()
    }

    if (!user.communities.includes(community._id)) {
      user.communities.push(community._id)
      await user.save()
    }

    return community
  } catch (error) {
    throw error
  }
}

export const removeUserFromCommunity = async (userClerkId: string, communityClerkId: string) => {
  try {
    // const userIdObject = await User.findOne({ clerkId: userClerkId }, { _id: 1 })
    // const communityIdObject = await Community.findOne({ clerkId: communityClerkId }, { _id: 1 })
    const [userIdObject, communityIdObject] = await Promise.all([
      User.findOne({ clerkId: userClerkId }, { _id: 1 }),
      Community.findOne({ clerkId: communityClerkId }, { _id: 1 })
    ])

    if (!userIdObject) {
      throw new Error('User not found')
    }

    if (!communityIdObject) {
      throw new Error('Community not found')
    }

    // Remove the user's _id from the members array in the community
    // await Community.updateOne({ _id: communityIdObject._id }, { $pull: { members: userIdObject._id } })

    // Remove the community's _id from the communities array in the user
    // await User.updateOne({ _id: userIdObject._id }, { $pull: { communities: communityIdObject._id } })

    await Promise.all([
      Community.updateOne({ _id: communityIdObject._id }, { $pull: { members: userIdObject._id } }),
      User.updateOne({ _id: userIdObject._id }, { $pull: { communities: communityIdObject._id } })
    ])

    return { success: true }
  } catch (error) {
    throw error
  }
}

export const updateCommunityInfo = async (communityClerkId: string, name: string, username: string, image: string) => {
  try {
    // Find the community by its _id and update the information
    const updatedCommunity = await Community.findOneAndUpdate({ clerkId: communityClerkId }, { name, username, image })

    if (!updatedCommunity) {
      throw new Error('Community not found')
    }

    return updatedCommunity
  } catch (error) {
    throw error
  }
}

export const deleteCommunity = async (communityClerkId: string) => {
  try {
    const deletedCommunity = await Community.findOneAndDelete({
      clerkId: communityClerkId
    })

    if (!deletedCommunity) {
      throw new Error('Community not found')
    }

    // Tìm tất cả các thread thuộc community
    const threads = await Thread.find({ community: deletedCommunity._id })

    // Tạo danh sách tất cả các thread cần xóa (bao gồm thread con)
    const threadIdsToDelete: string[] = []

    const getAllChildThreads = async (threadIds: string[]) => {
      const children = await Thread.find({ parentId: { $in: threadIds } })

      if (children.length === 0) return

      const childIds = children.map((child) => child._id.toString())
      threadIdsToDelete.push(...childIds)
      await getAllChildThreads(childIds)
    }

    // Thêm các thread thuộc community vào danh sách xóa
    threads.forEach((thread) => threadIdsToDelete.push(thread._id.toString()))

    // Tìm tất cả các thread con và thêm vào danh sách
    await getAllChildThreads(threadIdsToDelete)

    // Xóa tất cả các thread trong danh sách
    await Thread.deleteMany({ _id: { $in: threadIdsToDelete } })

    // Cập nhật user:
    // - Xóa communityId khỏi communities của user
    // - Xóa các threadId khỏi threads của user
    await User.updateMany(
      { communities: deletedCommunity._id },
      {
        $pull: {
          communities: deletedCommunity._id,
          threads: { $in: threadIdsToDelete }
        }
      }
    )

    // Xóa community
    await Community.deleteOne({ _id: deletedCommunity._id })

    return deletedCommunity
  } catch (error) {
    throw error
  }
}
