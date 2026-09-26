import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Key, Plus, Lock, UserX } from 'lucide-react';
import { INITIAL_STAFF } from '../../../data/mockData';
import { AdminUser, AdminRole } from '../../../types';
import { useAuth } from '../../../context/AuthContext';

export const StaffRolesView: React.FC = () => {
  const { adminUser } = useAuth();
  const [staffList, setStaffList] = useState<AdminUser[]>(INITIAL_STAFF);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Staff Management & Role-Based Access Control</h2>
          <p className="text-xs text-slate-400">
            Define administrative roles (SUPER_ADMIN, ADMIN, SUPPORT_STAFF) and 2FA credentials.
          </p>
        </div>

        <button
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New Staff Account</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Role Privileges</th>
                <th className="py-3 px-4">2FA Enforced</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {staffList.map((member) => (
                <tr key={member.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={member.avatar}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-lg object-cover border border-slate-700"
                      />
                      <div>
                        <p className="font-bold text-white font-sans">{member.name}</p>
                        <p className="text-[11px] text-slate-400">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        member.role === 'SUPER_ADMIN'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : member.role === 'ADMIN'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {member.twoFactorEnabled ? (
                      <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Enabled</span>
                      </span>
                    ) : (
                      <span className="text-amber-400 text-[11px]">Optional</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">
                    {member.lastLogin}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer font-sans">
                      Edit Permissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
