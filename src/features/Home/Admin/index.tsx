import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import BusinessManagement from './BusinessManagement'
import ContractManagement from './ContractManagement'
import CultivateManagement from './CultivateManagement'
import DisciplineManagement from './DisciplineManagement'
import PersonalManagement from './PersonalManagement'
import RewardManagement from './RewardManagement'
import Setting from './Setting'
import TrainingManagement from './TrainingManagement'

type Props = {}

const AdminPage = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element='admin' />
            <Route path='/PersonalManagement/*' element={<PersonalManagement />} />
            <Route path='/BusinessManagement/*' element={<BusinessManagement />} />
            <Route path='/CultivateManagement/*' element={<CultivateManagement />} />
            <Route path='/RewardManagement/*' element={<RewardManagement />} />
            <Route path='/DisciplineManagement/*' element={<DisciplineManagement />} />
            <Route path='/TrainingManagement/*' element={<TrainingManagement />} />
            <Route path='/ContractManagement/*' element={<ContractManagement />} />
            <Route path='/Setting/*' element={<Setting />} />
        </Routes>
    )
}

export default memo(AdminPage)